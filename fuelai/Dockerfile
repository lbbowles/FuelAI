FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm

RUN docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

RUN composer install --no-dev --optimize-autoloader --no-interaction
RUN npm ci && npm run build

CMD ["/bin/bash", "/app/start.sh"]
