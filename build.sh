#!/bin/sh

set -eu

# This script uses node-sass and uglifyjs (via the "uglify-es" package, which
# supports ES6)
# npm install -g node-sass
# npm install -g uglify-es
# npm install -g eslint

if [ -d "node_modules/.bin" ]; then
    export PATH="${PWD}/node_modules/.bin:${PATH}"
fi
echo "Processing scss..."
node-sass --output-style compressed src/css/main.scss static/css/main.min.css
echo "Minifying js..."
uglifyjs static/js/main.js -o static/js/main.min.js  -c -m
echo "Checking js..."
find static/js -name "*.js" -not -name "*min.js" | xargs eslint
