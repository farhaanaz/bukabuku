#!/bin/bash

set -e


cd frontend
npm install
npm run build


cd ..

TARGET="docker/app/wp-content/themes/mytheme"

rm -rf $TARGET/assets
rm -f $TARGET/index.html

cp -r frontend/dist/* $TARGET/