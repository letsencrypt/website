#!/bin/bash
outFile="$(dirname $0)/js/certcounts.tsv"

curl --silent https://ct.tacticalsecret.com/certcounts.tsv >${outFile}
