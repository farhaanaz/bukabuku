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
newgrp docker

cd /home/ubuntu
if [ ! -d "bukabuku" ]; then
  git clone https://github.com/farhaanaz/bukabuku.git
fi

cd /home/ubuntu/bukabuku
git fetch --all
git reset --hard origin/main

sleep 20

cd /home/ubuntu/bukabuku/docker

docker compose pull
docker compose up -d --remove-orphans