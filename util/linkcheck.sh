#!/bin/bash -xe

TEST_SERVER_PORT=8080
BADLINKS_FILE=broken.links.txt

command -v linkchecker >/dev/null 2>&1 || { echo "linkchecker not found. please 'pip install linkchecker'" >&2; exit 1; }

# Install the linkcheckerrc config file
# NOTE(@cpu): Unfortunately it seems like there isn't a way to specify a config
# file by the command line and so we must place it in this expected location.
mkdir -p ~/.linkchecker
cp util/linkcheckerrc ~/.linkchecker/

pushd _site
  python -m SimpleHTTPServer $TEST_SERVER_PORT &>/dev/null &
  serverPID=$!

  # NOTE(@cpu): linkchecker's exit status is non-zero based on warnings even
  # when no broken links are found. To work around this we output just the
  # broken links in `blacklist` format to a file and squash the true exit code.
  # If the file is present/non-empty CI fails
  linkchecker --file-output=blacklist/$BADLINKS_FILE http://localhost:$TEST_SERVER_PORT 2> /dev/null || true

  if [ -e $BADLINKS_FILE ]
  then
    echo "Broken links found"
    cat $BADLINKS_FILE
    exit 1
  fi

  kill $serverPID
popd

exit 0
