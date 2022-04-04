#!/bin/sh
set -e

# rewrite runtime config placeholders, with ENV vars from docker
/app/scripts/template.sh /app/eva/index.html mpa
/app/scripts/template.sh /app/eva/backup.html spa

nginx -g 'daemon on;'
/app/alice goose up

exec "$@"
