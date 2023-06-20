#!/bin/sh
export NODE_OPTIONS=--max-old-space-size=2192

if [ "$1" = "b2c" ]
then
    echo "App build started for b2c environment."
    npm run build:b2c
elif [ "$1" = "b2b" ]
then
    echo "App build started for b2b environment."
    npm run build:b2b
else
    echo "Environment type is empty or has wrong value. Available types: b2b, b2c."
fi
