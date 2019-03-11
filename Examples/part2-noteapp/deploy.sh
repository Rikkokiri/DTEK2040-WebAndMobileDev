#!/bin/sh
npm run build
rm -rf ../part3-helloworld/build
cp -r build ../part3-helloworld/