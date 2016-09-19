#!/bin/bash
outFile="$(dirname $0)/js/cert-timeline.tsv"

curl --silent https://ct.tacticalsecret.com/cert-timeline.tsv >${outFile}
