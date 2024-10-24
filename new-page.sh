#!/usr/bin/env bash

delete_mode=0

if [ "${1}" = "-d" ]; then
  delete_mode=1
  shift
fi

if [ -z "${1}" ] || [ "${1}" = "-h" ] || [ "${1}" = "-help" ] || [ "${1}" = "--help" ]; then
  echo "Usage: ${0} [-d] <page-path> [<page title>]"
  echo "Examples:"
  echo "${0} my-page \"My Page Title\""
  echo "${0} post/my-post \"My Post Title\""
  echo "${0} -d my-page"
  exit 1
fi

path=$(dirname "${1}")
slug=$(basename "${1}")
filename="${slug}.md"

if [ "${delete_mode}" -eq 0 ]; then
  if [ -z "${2}" ]; then
    echo "Error: Page title is required for creating a page."
    exit 1
  fi
  title="${2}"
  date=$(date +%Y-%m-%d)
fi

for i in $(find . -type d -path './content/*' -maxdepth 2); do
  if [ "${delete_mode}" -eq 1 ]; then
    # Delete mode
    if [ -f "${i}/${path}/${filename}" ]; then
      rm "${i}/${path}/${filename}"
      echo "Deleted page: ${i}/${path}/${filename}"
    fi
    # Optionally delete the directory if it's empty and not 'post'
    if [ -d "${i}/${path}" ] && [ "${path}" != "post" ] && [ "$(ls -A "${i}/${path}")" = "" ]; then
      rmdir "${i}/${path}"
      echo "Deleted empty directory: ${i}/${path}"
    fi
  else
    # Create mode
    # Create directory if it doesn't exist and path is not 'post'
    if [ ! -d "${i}/${path}" ] && [ "${path}" != "post" ]; then
      mkdir -p "${i}/${path}"
      echo "Created directory: ${i}/${path}"
    fi

    if [ "${i}" = "./content/en" ]; then
      # Create the new page for English content
      if [ ! -f "${i}/${path}/${filename}" ]; then
        cat > "${i}/${path}/${filename}" << EOF
---
title: ${title}
slug: ${slug}
date: ${date}
lastmod: ${date}
show_lastmod: false
---

EOF
        echo "Created page: ${i}/${path}/${filename}"
      fi
    else
      # For non-English content (translations)
      if [ "${path}" = "post" ]; then
        continue
      fi
      if [ ! -f "${i}/${path}/${filename}" ]; then
        cat > "${i}/${path}/${filename}" << EOF
---
title: ${title}
slug: ${slug}
date: ${date}
lastmod: ${date}
show_lastmod: false
untranslated: 1
---

EOF
        echo "Created page: ${i}/${path}/${filename}"
      fi
    fi
  fi
done
