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
locale=${LOCALE:-en}
cdnURL=$CDN_URL
aliceUrl=${ALICE_URL:-null}
statusPage=${STATUS_PAGE:-null}
termsPage=${TERMS_PAGE:-null}
privacyPage=${PRIVACY_PAGE:-null}
featurePage=${FEATURE_PAGE:-null}
securityPage=${SECURITY_PAGE:-null}
email=${EMAIL:-null}
description=${DESCRIPTION}

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
-e 's|src=\"/|src=\"$cdnURL/|g' \
-e 's|link href=\"/|link href=\"$cdnURL/|g' \
-e 's|:ALICE_URL:|$aliceUrl|g' \
-e 's|:STATUS_PAGE:|$statusPage|g' \
-e 's|:TERMS_PAGE:|$termsPage|g' \
-e 's|:PRIVACY_PAGE:|$privacyPage|g' \
-e 's|:FEATURE_PAGE:|$featurePage|g' \
-e 's|:SECURITY_PAGE:|$securityPage|g' \
-e 's|:LOCALE:|$locale|g' \
-e 's|:EMAIL:|$email|g' \
-e 's|:DESCRIPTION:|$description|g' \
-e 's|\"mpa\":true|\"mpa\":$mpa|g' \
-e 's|\"spa\":false|\"spa\":$spa|g' \
$file \
"
