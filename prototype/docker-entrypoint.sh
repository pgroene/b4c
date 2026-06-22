#!/bin/sh
set -e

# Generate /usr/share/nginx/html/config.js from template at container start.
# Set DEMO_PASSWORD env var in the container to protect the demo.
# Leave it empty to skip the password gate (useful for internal/dev environments).

DEMO_PASSWORD="${DEMO_PASSWORD:-}"

sed "s/__DEMO_PASSWORD__/${DEMO_PASSWORD}/g" \
  /etc/nginx/config.template.js \
  > /usr/share/nginx/html/config.js

echo "[entrypoint] config.js generated (password protection: $([ -n "$DEMO_PASSWORD" ] && echo 'enabled' || echo 'disabled'))"

exec "$@"
