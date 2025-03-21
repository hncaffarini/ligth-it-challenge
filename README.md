# Light IT Challenge

A demo application for patient registration.

> This app solves [this challenge](https://lightit.slite.page/p/lzAFJyBVgxbWAO/FullStack-Challenge-Patient-Registration), and is written in Laravel and React.

## Installation

Clone the repo locally:

```sh
git clone https://github.com/hncaffarini/ligth-it-challenge.git
cd light-it-challenge
```

Install PHP dependencies:

```sh
composer install
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Run [sail](https://laravel.com/docs/12.x/sail#main-content):

```sh
./vendor/bin/sail up
```

(inside the container) Run database migrations:

```sh
php artisan migrate
```

(inside the container) Run database seeder:

```sh
php artisan db:seed
```

(inside the container) Install NPM dependencies:

```sh
npm i
```

(inside the container) Build assets:

```sh
npm run dev
```
