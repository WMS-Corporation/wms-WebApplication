#!/bin/sh


envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Replace placeholders in env-config.js with environment variables
echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
echo "  REACT_APP_API_SERVER_URL: \"$REACT_APP_API_SERVER_URL\"," >> /usr/share/nginx/html/env-config.js
echo "  REACT_APP_TEMPERATURE_REFRIGERATED_VALID_RANGE: \"$REACT_APP_TEMPERATURE_REFRIGERATED_VALID_RANGE\"," >> /usr/share/nginx/html/env-config.js
echo "  REACT_APP_TEMPERATURE_NOT_REFRIGERATED_VALID_RANGE: \"$REACT_APP_TEMPERATURE_NOT_REFRIGERATED_VALID_RANGE\"" >> /usr/share/nginx/html/env-config.js
echo "}" >> /usr/share/nginx/html/env-config.js

exec "$@"