#!/bin/bash

apt update -y
apt install docker.io docker-compose git -y
systemctl enable docker
systemctl start docker

usermod -aG docker ubuntu

cd /home/ubuntu
git clone https://github.com/farhaanaz/bukabuku.git
cd bukabuku/docker
docker-compose up -d

