# FWE-WS21-22-764770

dependencies:
    not included:
        - tslint tslint-config-airbnb
        - typescript-tslint-plugin

from: https://code.fbi.h-da.de/fbi1483/fwe-ss-20-finance-tracker/

Setup backend
Create environment file

cp ./packages/backend/.env.example ./packages/backend/.env

Install npm packages

docker-compose run backend npm install

Start containers


docker-compose up / docker-compose up -d


Sync database schema

docker-compose exec backend npm run typeorm schema:sync

Insert fixtures

docker-compose exec backend npm run fixtures