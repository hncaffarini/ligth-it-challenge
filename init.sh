#!/bin/sh

echo "Installing composer dependencies"
composer install
echo "Done \n"

echo "Creating .env file"
cp .env.example .env
echo "Done \n"

echo "Setting up the app key"
php artisan key:generate
echo "Done \n"

echo "Running migrations"
php artisan migrate --force
echo "Done \n"

echo "NOTE: If you want, you could run later the default seeders (php artisan db:seed) \n"
#php artisan db:seed --force

echo "Linking the storage folders"
php artisan storage:link
echo "Done \n"

echo "Running the queue worker"
php artisan queue:work &
echo "Done \n"

echo "Building the assets"
npm run build

echo "Done :)"
