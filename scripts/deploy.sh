#!/bin/sh

LAST_HASH=$(git rev-parse --short HEAD)
LAST_MESSAGE=$(git log -1 --pretty=%B)
npm run build && gh-pages -d build -m "[Release $LAST_HASH] $LAST_MESSAGE"
