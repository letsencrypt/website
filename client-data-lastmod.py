# This script updates data/clients.json by cloning every referenced git
# repository and noting the time of the most recent commit. The new
# JSON data is saved into data/clients.json.new.

import git
import json
import sys
import tempfile
import time

try:
    clients = json.load(open("data/clients.json"))
except FileNotFoundError:
    print("Could not open data/clients.json; wrong working dir?")
    sys.exit(1)

for client in clients["list"]:
    name = client["name"]
    if "url" in client:
        url = client["url"]
        # Remove any prior last_commit data, in case the repository can't be
        # cloned this time.
        if "last_commit" in client:
            del client["last_commit"]
        if "github.com/" in url or "gitlab.com/" in url or \
                 "codeberg" in url or url.startswith("https://git."):
            with tempfile.TemporaryDirectory() as tempdir:
                try:
                    print(name, "Cloning", url)
                    repo = git.Repo.clone_from(url, tempdir)
                    # committed_date is potentially newer than authored_date
                    committed_date = repo.commit().committed_date
                    committed_datetime = repo.commit().committed_datetime
                    print(name, committed_datetime)
                    client["last_commit"] = committed_date
                    # If the repo didn't work before but did work this time,
                    # remove the error notation.
                    if "repo_error" in client:
                        del client["repo_error"]
                except Exception as e:
                    # If the repo didn't work this time, note the error.
                    print(name, "Error:", e)
                    client["repo_error"] = 1
        else:
            print(name, "No detected git URL for client")
    else:
        print(name, "No URL for client")

json.dump(clients, open("data/clients.json.new", "w"), indent="\t")

# Sample jq processing:
# 
# jq -r '."list"[] | select(."last_commit")? | "\(now - .last_commit | round): \(.name)" '  < clients.json.new | sort -n
#
# We could also do this in native Python. The age of the last commit, in
# seconds, would be
#
# int(time.time() - repo.commit().committed_date)
#
# so an action could be taken based on this (removing the entry, saving
# it in a different file, giving it an additional field, etc.).
