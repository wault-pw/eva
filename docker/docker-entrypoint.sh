#!/bin/sh
# vim:sw=4:ts=4:et

set -e

# rewrite runtime config placeholders
# with ENVv vars from docker
/app/scripts/template.sh /app/index.html mpa
/app/scripts/template.sh /app/backup.html spa

exec "$@"
