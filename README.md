# Installation and Use

1. Create and configure .env file, please check .env.example for reference
2. Download Docker CE: https://docs.docker.com/install/
3. Run the database: 
```bash
npm run-script postgres:up
```
4. (Optional) Generate database migrations:
```bash
npm run-script generate-migrations -- -n <MIGRATION-NAME>
```
5. Run Migrations: 
```bash
npm run-script run-migrations
```
6. Run the server in development-mode:
```bash
npm run start:dev
```

Server is now available on port 5001

# API

GET ```localhost:5001/mappings/:id```
Serves the mapping object availble at the given id

POST ```localhost:5001/mappings/:id```
Updates the mapping object with the object given in the request body
