# This script updates data/clients.json by removing all clients
# with last_commit older than a specified value. The new JSON data
# is saved into data/clients.json.new.

year = 365 * 86400
cutoff = 2 * year

import json
import sys
import time

try:
    clients = json.load(open("data/clients.json"))
except FileNotFoundError:
    print("Could not open data/clients.json; wrong working dir?")
    sys.exit(1)

new_list = []
old_clients = len(clients["list"])
for client in clients["list"]:
    name = client["name"]
    if "last_commit" in client:
        age = int(time.time() - client["last_commit"])
        if age < cutoff:
            new_list.append(client)
        else:
            print("Dropping {} (age = {})".format(name, age))
    else:
        # No last_commit data for this client
        new_list.append(client)

print("Old: {}  New: {}".format(old_clients, len(new_list)))
clients["list"] = new_list

json.dump(clients, open("data/clients.json.new", "w"), indent="\t")
