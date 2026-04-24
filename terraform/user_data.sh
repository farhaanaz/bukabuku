#!/bin/bash

set -e

exec > /var/log/user-data.log 2>&1


# INSTALL BASIC PACKAGES
apt update -y
apt install -y ca-certificates curl gnupg lsb-release git

# INSTALL DOCKER
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

# CLONE / UPDATE REPO

cd /home/ubuntu

if [ ! -d "bukabuku" ]; then
  git clone https://github.com/farhaanaz/bukabuku.git
fi

cd /home/ubuntu/bukabuku
git fetch --all
git reset --hard origin/main

sleep 20


# DOCKER COMPOSE

cd /home/ubuntu/bukabuku/docker

# reset container + volume 
sudo docker compose down -v || true

# pull latest image
sudo docker compose pull

# start container
sudo docker compose up -d --remove-orphans


# WAIT CONTAINER READY

echo "Waiting containers..."
sleep 15

# WAIT DATABASE READY

echo "Waiting database..."

until sudo docker exec bukabuku-wpcli wp db check --path=/var/www/html --allow-root >/dev/null 2>&1; do
  echo "Database not ready..."
  sleep 5
done

echo "Database ready!"

# AUTO INSTALL WORDPRESS

if ! sudo docker exec bukabuku-wpcli wp core is-installed --path=/var/www/html --allow-root; then
  echo "Installing WordPress..."

  PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)

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
# FIX PERMISSION (CRITICAL)

sudo chown -R ubuntu:www-data /home/ubuntu/bukabuku/docker/app/wp-content/themes
sudo chmod -R 775 /home/ubuntu/bukabuku/docker/app/wp-content/themes

sudo find /home/ubuntu/bukabuku/docker/app/wp-content/themes -type d -exec chmod g+s {} \;