#!/bin/bash

set -e

exec > /var/log/user-data.log 2>&1

echo "=== START SETUP ==="

# ==============================
# INSTALL BASIC PACKAGES
# ==============================
apt update -y
apt install -y ca-certificates curl gnupg lsb-release git

# ==============================
# INSTALL DOCKER
# ==============================
install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update -y
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

systemctl enable docker
systemctl start docker

usermod -aG docker ubuntu

# ==============================
# CLONE / UPDATE REPO
# ==============================
cd /home/ubuntu

if [ ! -d "bukabuku" ]; then
  git clone https://github.com/farhaanaz/bukabuku.git
fi

cd /home/ubuntu/bukabuku
git fetch --all
git reset --hard origin/main

# ==============================
# CHECK FRONTEND BUILD
# ==============================
echo "Checking frontend build..."
if [ ! -d "/home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme/dist" ]; then
  echo "dist folder missing!"
else
  echo "dist folder exists"
fi

# ==============================
# DOCKER COMPOSE
# ==============================
cd /home/ubuntu/bukabuku/docker

docker compose down -v || true
docker compose pull
docker compose up -d --remove-orphans

# ==============================
# WAIT CONTAINER READY
# ==============================
echo "Waiting containers..."
sleep 10

# ==============================
# WAIT MYSQL READY
# ==============================
echo "Waiting MySQL..."

until docker exec mysql mysqladmin ping -h "localhost" --silent; do
  echo "MySQL not ready..."
  sleep 5
done

echo "MySQL is ready!"

# ==============================
# WAIT NETWORK STABILIZE
# ==============================
echo "Waiting Docker network..."
sleep 10

# ==============================
# WAIT WORDPRESS DB READY
# ==============================
echo "Waiting WordPress DB connection..."

until docker exec bukabuku-wpcli bash -c "
wp db check --path=/var/www/html --allow-root
" >/dev/null 2>&1; do
  echo "WordPress DB not ready..."
  sleep 5
done

echo "WordPress DB ready!"

# ==============================
# AUTO INSTALL WORDPRESS
# ==============================
if ! docker exec bukabuku-wpcli wp core is-installed --path=/var/www/html --allow-root; then
  echo "Installing WordPress..."

  PUBLIC_IP=$(curl -s --retry 5 http://checkip.amazonaws.com)

  docker exec bukabuku-wpcli wp core install \
    --path=/var/www/html \
    --url="http://$PUBLIC_IP" \
    --title="Bukabuku" \
    --admin_user="admin" \
    --admin_password="admin123" \
    --admin_email="admin@mail.com" \
    --skip-email \
    --allow-root

  echo "WordPress installed!"
else
  echo "WordPress already installed"
fi

# ==============================
# ACTIVATE THEME
# ==============================
echo "Setting theme..."

docker exec bukabuku-wpcli wp theme activate mytheme \
  --path=/var/www/html \
  --allow-root

echo "Theme activated!"

# ==============================
# FIX PERMISSION
# ==============================
chown -R ubuntu:www-data /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme

find /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme -type d -exec chmod 755 {} \;
find /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme -type f -exec chmod 644 {} \;

echo "Permissions fixed!"

# ==============================
# FINAL CHECK
# ==============================
echo "Final dist check:"
ls /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme/dist || echo "❌ dist missing"

echo "=== SETUP COMPLETE ==="