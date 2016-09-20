#!/bin/bash
outFile="$(dirname $0)/js/cert-timeline.tsv"

# Download to a temp file, then move over-top the original, so that the update is
# atomic from the perspective of the webserver
curl --silent https://ct.tacticalsecret.com/cert-timeline.tsv >"${outFile}.bak"
mv "${outFile}.bak" "${outFile}"
