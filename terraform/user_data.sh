#!/bin/bash

sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

sudo apt install docker-compose -y

sudo usermod -aG docker ubuntu
