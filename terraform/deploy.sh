#!/bin/bash

set -e


cd frontend
npm install
npm run build


cd ..

sudo chown -R ubuntu:ubuntu /home/ubuntu/bukabuku/docker/app/wp-content/themes/mytheme/dist/

TARGET="docker/app/wp-content/themes/mytheme"

rm -rf $TARGET/assets
rm -f $TARGET/index.html

cp -r frontend/dist/* $TARGET/