#!/bin/bash

# This script uses node-sass and uglifyjs
# npm install -g node-sass
# npm install -g uglify-js

node-sass --output-style compressed ./src/css/main.scss ./static/css/main.min.css

uglifyjs ./static/js/main.js -o ./static/js/main.min.js  -c -m