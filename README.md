# Light IT Challenge

A demo application for patient registration.

> This app solves [this challenge](https://lightit.slite.page/p/lzAFJyBVgxbWAO/FullStack-Challenge-Patient-Registration), and is written in Laravel and React.

## Installation

Clone the repo locally:

```sh
git clone https://github.com/hncaffarini/ligth-it-challenge.git light-it && cd light-it
```

Run the init script to start:

```sh
composer install
```

Setup configuration:

```sh
cp .env.example .env && php artisan key:generate
```

Run docker:

```sh
docker compose up --build -d && docker exec -it lightit bash
```

(inside the container) Run migrations:

```sh
php artisan migrate
```

(inside the container) If you want some preloaded patients, please run database seeder:

```sh
php artisan db:seed
```

(inside the container) Run the storage link:

```sh
php artisan storage:link
```

(inside the container) Build assets:

```sh
npm i && npm run build
```

(inside the container) If you want to test the async mailing, run queue worker:

```sh
php artisan queue:work
```
