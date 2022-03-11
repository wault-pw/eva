#!/bin/sh
set -e

# example
# 1) make generate:mpa generate:spa
# 1) VERSION=foo scripts/template.sh dist/index.html mpa
# 1) VERSION=foo scripts/template.sh dist/backup.html spa
# to make sed work the same as it does on linux,
# brew install gnu-sed

file=$1
mode=$2
spa=""
mpa=""

if [ "$mode" = "spa" ]; then
  spa="true"
  mpa="false"
else
  spa="false"
  mpa="true"
fi

SED=$(command -v gsed || command -v sed)
eval "
$SED -i \
-e 's|src=\"/|src=\"$CDN_URL/|g' \
-e 's|rel=\"preload\" href=\"/|rel=\"preload\" href=\"$CDN_URL/|g' \
-e 's|:ALICE_URL:|$ALICE_URL|g' \
-e 's|:STATUS_PAGE:|$STATUS_PAGE|g' \
-e 's|spa:!1|spa:$spa|g' \
-e 's|mpa:!0|mpa:$mpa|g' \
$file \
"
