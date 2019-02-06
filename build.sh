#!/bin/sh

set -eu

# This script uses node-sass and uglifyjs
# npm install -g node-sass
# npm install -g uglify-es

echo "Processing scss..."
node-sass --output-style compressed src/css/main.scss static/css/main.min.css
echo "Minifying js..."
uglifyjs static/js/main.js -o static/js/main.min.js  -c -m
