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
$(. /etc/os-release && echo $VERSION_CODENAME) stable" \
| tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update -y
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

systemctl enable docker
systemctl start docker

sleep 10

# ==============================
# CLONE REPO
# ==============================
cd /home/ubuntu

if [ ! -d "bukabuku" ]; then
  git clone https://github.com/farhaanaz/bukabuku.git
fi

cd /home/ubuntu/bukabuku
git fetch --all
git reset --hard origin/main

# ==============================
# RUN DOCKER
# ==============================
cd /home/ubuntu/bukabuku/docker

sudo docker compose down -v || true
sudo docker compose pull
sudo docker compose up -d --remove-orphans

echo "Waiting containers..."
sleep 25

# ==============================
# WAIT MYSQL
# ==============================
until sudo docker exec mysql mysqladmin ping -h "localhost" --silent; do
  echo "MySQL not ready..."
  sleep 5
done

echo "MySQL ready!"

# ==============================
# WAIT WORDPRESS
# ==============================
until sudo docker exec bukabuku-wordpress test -f /var/www/html/wp-config.php; do
  echo "Waiting wp-config.php..."
  sleep 3
done

echo "WordPress ready!"

# ==============================
# FIX wp-config.php (REMOVE BAD CONSTANT)
# ==============================
echo "Fixing wp-config.php..."

sudo docker exec bukabuku-wordpress sed -i "/WP_SITEURL/d" /var/www/html/wp-config.php || true
sudo docker exec bukabuku-wordpress sed -i "/WP_HOME/d" /var/www/html/wp-config.php || true

# ==============================
# FIX PERMISSION
# ==============================
sudo docker exec bukabuku-wordpress bash -c "
chown -R www-data:www-data /var/www/html
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;
" || true

# ==============================
# INSTALL WORDPRESS (SAFE)
# ==============================
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)

if ! sudo docker exec bukabuku-wpcli wp core is-installed --path=/var/www/html --allow-root; then
  echo "Installing WordPress..."

  sudo docker exec bukabuku-wpcli wp core install \
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

sleep 5

# ==============================
# FIX URL (DOUBLE GUARANTEE)
# ==============================
echo "Fixing URL..."

sudo docker exec mysql mysql -u root -prootpassword wordpress -e "
UPDATE wp_options 
SET option_value='http://$PUBLIC_IP'
WHERE option_name IN ('home','siteurl');
" || true

sudo docker exec bukabuku-wpcli wp option update home "http://$PUBLIC_IP" \
  --path=/var/www/html --allow-root || true

sudo docker exec bukabuku-wpcli wp option update siteurl "http://$PUBLIC_IP" \
  --path=/var/www/html --allow-root || true

# ==============================
# FLUSH REWRITE
# ==============================
sudo docker exec bukabuku-wpcli wp rewrite flush \
  --path=/var/www/html --allow-root || true

# ==============================
# ACTIVATE THEME
# ==============================
sudo docker exec bukabuku-wpcli wp theme activate mytheme \
  --path=/var/www/html --allow-root || true

# ==============================
# CLEAN HTACCESS
# ==============================
sudo docker exec bukabuku-wordpress rm -f /var/www/html/.htaccess || true

# ==============================
# FINAL CHECK
# ==============================
ls /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme/dist || echo "dist missing"

echo "=== SETUP COMPLETE ==="