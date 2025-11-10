#!/bin/bash
set -e

echo "PORT is set to: $PORT"
echo "Running migrations..."
php artisan migrate --force

echo "Starting server on 0.0.0.0:$PORT"
exec php artisan serve --host=0.0.0.0 --port=$PORT
