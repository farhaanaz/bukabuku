#!/bin/bash

set -e

exec > /var/log/user-data.log 2>&1

apt update -y
apt install -y ca-certificates curl gnupg lsb-release git

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

cd /home/ubuntu
if [ ! -d "bukabuku" ]; then
  git clone https://github.com/farhaanaz/bukabuku.git
fi

cd /home/ubuntu/bukabuku
git fetch --all
git reset --hard origin/main

sleep 20

cd /home/ubuntu/bukabuku/docker

# STOP + REMOVE container & volume
sudo docker compose down -v || true

# PULL IMAGE
sudo docker compose pull

# RUN CONTAINER
sudo docker compose up -d --remove-orphans

sleep 10

sudo docker exec bukabuku-wordpress bash -c "
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar &&
chmod +x wp-cli.phar &&
mv wp-cli.phar /usr/local/bin/wp
"

# FIX PERMISSION
sudo chown -R ubuntu:www-data /home/ubuntu/bukabuku/docker/app/wp-content/themes
sudo chmod -R 775 /home/ubuntu/bukabuku/docker/app/wp-content/themes

# specific theme
sudo chown -R ubuntu:www-data /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme
sudo chmod -R 775 /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme

echo "Waiting for WordPress container..."

until sudo docker exec bukabuku-wordpress wp core is-installed --allow-root 2>/dev/null; do
  echo "WordPress not ready yet..."
  sleep 5
  break
done

# ==============================
# AUTO INSTALL WORDPRESS (ONLY IF NOT INSTALLED)
# ==============================
if ! sudo docker exec bukabuku-wordpress wp core is-installed --allow-root; then
  echo "Installing WordPress..."

  PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)

  sudo docker exec bukabuku-wordpress wp core install \
    --url="http://$PUBLIC_IP" \
    --title="Bukabuku" \
    --admin_user="admin" \
    --admin_password="admin123" \
    --admin_email="admin@mail.com" \
    --skip-email \
    --allow-root
else
  echo "WordPress already installed, skipping..."
fi

sudo find /home/ubuntu/bukabuku/docker/app/wp-content/themes -type d -exec chmod g+s {} \;