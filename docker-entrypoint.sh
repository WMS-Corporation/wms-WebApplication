#!/bin/sh
set -e

# Set up endpoint for env retrieval
echo "window._env_ = {" > /usr/share/nginx/html/env_config.js

# Collect environment variables for react
env | grep REACT_APP.*= | while read -r line; do
    printf "%s',\n" $line | sed "s/=/:'/" >> /usr/share/nginx/html/env_config.js
    
    # Notify the user
    printf "Env variable %s' was injected into React App. \n" $line | sed "0,/=/{s//:'/}"
done

# End the object creation
echo "}" >> /usr/share/nginx/html/env_config.js

echo "Environment Variable Injection Complete."

exec "$@"