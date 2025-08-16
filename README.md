# Bookshub
A book database management system with user authorization developed on Laravel (backend) and React (frontend using Inertia.js ). This app includes:
* Book Management (CRUD)
* Filtering and sorting books
* Pagination while maintaining filters
* Separation of roles (guest/authorized user)

# Setup Instructions
## Prerequisites
Ensure you have the following installed on your computer:
- Docker

## Docker Setup
1. Start the containers using `docker-compose.yml`.
2. Run the following commands:
### PHP-FPM
```bash
composer install
php artisan key:generate
php artisan migrate
php artisan storage:link
```
### node:

```bash
npm install
npm run build
```
## If you're not using Docker, set up the environment locally.
- Nginx
- PostgreSQL
- PHP
- Node.js

Instead of Nginx, you can use the following command to serve the application:
```bash
php artisan serve
```
