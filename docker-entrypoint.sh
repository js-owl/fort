#!/bin/sh
set -e

su -s /bin/sh nextjs -c 'cd /app && HOSTNAME=127.0.0.1 PORT=3000 node server.js' &
NODE_PID=$!

i=1
while [ "$i" -le 30 ]; do
  if curl -sf http://127.0.0.1:3000/health >/dev/null 2>&1; then
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "Next.js failed to start" >&2
    kill "$NODE_PID" 2>/dev/null || true
    exit 1
  fi
  i=$((i + 1))
  sleep 1
done

nginx -g "daemon off;" &
NGINX_PID=$!

trap 'kill "$NODE_PID" "$NGINX_PID" 2>/dev/null || true; exit 1' INT TERM

while kill -0 "$NODE_PID" 2>/dev/null && kill -0 "$NGINX_PID" 2>/dev/null; do
  sleep 2
done

STATUS=0
if ! kill -0 "$NODE_PID" 2>/dev/null; then
  wait "$NODE_PID" || STATUS=$?
fi
if ! kill -0 "$NGINX_PID" 2>/dev/null; then
  wait "$NGINX_PID" || STATUS=$?
fi

kill "$NODE_PID" "$NGINX_PID" 2>/dev/null || true
wait "$NODE_PID" "$NGINX_PID" 2>/dev/null || true
exit "$STATUS"
