#!/bin/sh

wt compile --includes=./src/css/ --build=./static/css ./src/css/main.scss
hugo
