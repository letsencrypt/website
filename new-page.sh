#!/usr/bin/env bash

if [ -z "${1}" ] || [ -z "${2}" ] || [ "${1}" = "-h" ] || [ "${1}" = "-help" ] || [ "${1}" = "--help" ]
then
  echo "Usage: "${0}" <page-path> <page title>"
  echo "Examples:"
  echo "${0} my-page \"My Page Title\""
  echo "${0} post/my-post \"My Post Title\""
  exit 1
fi

path=$(dirname "${1}")
slug=$(basename "${1}")
filename="${slug}.md"
title="${2}"
date=$(date +%Y-%m-%d)

for i in $(find . -type d -path './content/*' -maxdepth 2)
do
    # If the directory doesn't exist, create it.
    if ! [ -d "${i}/${path}" ] && ! [ "${path}" = post ]
    then
        mkdir -p "${i}/${path}"
        echo "Created directory: ${i}/${path}"
    fi

    # Actions only for English (e.g. blog posts, etc.)
    if [ ${i} = "./content/en" ]
    then
        # Create the new page.
        if ! [ -f "${i}/${path}/${filename}" ]
        then
            cat > "${i}/${path}/${filename}" << EOF
---
title: ${title}
slug: ${slug}
lastmod: ${date}
show_lastmod: false
---

EOF
        echo "Created page: ${i}/${path}/${filename}"
        fi
    else
        # Actions only for non-English (e.g. no-translation stubs, etc.)

        # Blog posts are only created for the "en" directory.
        if [ "${path}" = post ]
        then
            continue
        fi

        # Create the stub (untranslated) page.
        if ! [ -f "${i}/${path}/${filename}" ]
        then
            cat > "${i}/${path}/${filename}"  << EOF
---
title: ${title}
slug: ${slug}
lastmod: ${date}
show_lastmod: false
untranslated: 1
---

EOF
        echo "Created page: ${i}/${path}/${filename}"
        fi
    fi
done
