#!/bin/bash
outFile="$(dirname $0)/js/graphdata.tsv"

curl --silent https://ct.tacticalsecret.com/graphdata.tsv >${outFile}
