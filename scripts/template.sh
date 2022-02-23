#!/bin/sh
set -e

# example
# 1) make generate:mpa generate:spa
# 1) VERSION=foo scripts/template.sh dist/backup.html

# to make sed work the same as it does on linux,
# brew install gnu-sed
SED=$(command -v gsed || command -v sed)
eval "$SED" -i -e "s/:VERSION:/$VERSION/g" "$1"
