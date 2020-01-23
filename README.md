<p align="center">
  <img src="https://avatars1.githubusercontent.com/u/59266947" alt="w3tec" width="200" />
</p>

<h1 align="center">DappHero.io Backend</h1>

<p align="center">
</p>

<p align="center">
  <b>A Node.js backend server: RESTful API & GraphQL services written in TypeScript.</b></br>
  <span>Made with ❤️ by <a href="https://github.com/dappherocore">DappHero.io</span></br>
  <sub></a></sub>
</p>

<br />
<hr color="#b9cced">

## ❯ Why

This project main goal is a to provide a complete server application for dapphero's administration tool and javascript bundle.

### Features

- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **Clear Structure** with different layers such as controllers, services, repositories, models and middlewares.
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/pleerock/routing-controllers).
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator).
- **API Documentation** thanks to [swagger](http://swagger.io/). (WIP)
- **Integrated Testing Tool** thanks to [Jest](https://facebook.github.io/jest). (WIP)
- **E2E API Testing** thanks to [supertest](https://github.com/visionmedia/supertest). (WIP)

<br>
<hr color="#b9cced">

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Database Management](#-database-management)
- [GraphQL](#-graph-q-l)
- [Further Documentations](#-further-documentations)
- [License](#-license)

<br>
<hr color="#b9cced">

## Basic Overview

DappHero is a web 2.0 app that allows no-code users to drag & drop blockchain connected components (web 3.0 components) into their webs. :rocket:

<br>
<hr color="#b9cced">

## ❯ Getting Started

A quick introduction of the minimal setup you need to get the server up & running on your local machine.

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install all project dependencies:
```bash
npm install
```

Configure your environment's variables on a new `.env` file:
```
TORM_CONNECTION=postgres
TORM_HOST=localhost
TORM_PORT=5432
TORM_USERNAME=postgres
TORM_PASSWORD=dapphero
TORM_DATABASE=postgres
TORM_SYNCHRONIZE=true
```

### Step 2: Set up Postgres Database

If it's your first time with docker, please download it and install it from  https://docs.docker.com/install/

Once installed, run the database container locally:
```bash
npm run-script postgres:up
```

Finally, run all the available migrations:
```bash
npm run-script run-migrations
```

### Step 3: Run the server on Development Mode

This command will start the server using nodemon dependency. This dependency will reload the server on any new code change:
```bash
npm run-script start:dev
```


**Server is now available on port 5001!** :smile:

<br>

<hr color="#b9cced">

## ❯ Project Structure

Inside the main root folder `src/` you will find the following structure

| Route          | Description |
| -------------- | ----------- |
| **server.ts**   | Main entrypoint of the server |
| **/controllers** | API Controllers declarations, responsible for handling with inconming requests|
| **/db**   | TypeORM entities declarations, migrations and models repositories |
| **/middewares**   | All custom middlewares goes in here |
| **/services**   | Service logics that interacts with controllers and databases repositories |
| **/tests**   | All custom tests goes in here |

<br>
<hr color="#b9cced">

## ❯ API Routes

The route prefix is `/` by default

| Route          | Description |
| -------------- | ----------- |
| **/api**       | API routes|
| **/graphql**   | Route to the graphql editor |
| **/swagger**   | Swagger UI with our API documentation |

<br>
<hr color="#b9cced">

## ❯ Database Management

We created a few custom scripts to make TypeORM's Database Management easier:

#### Create a new Migration

This command will generate a new migration file with all the SQL commands needed to reflect your current schema on the database

```bash
npm run-script generate-migrations -- -n <MIGRATION-NAME>
```
#### Running Migrations

After creating a new migration, you will have to run it in order to update your database schema:


```bash
npm run-script run-migrations
```

<br>
<hr color="#b9cced">

## ❯ GraphQL 

(WIP)

For the GraphQL part we will be using the library [TypeGraphQL](https://19majkel94.github.io/type-graphql/).

The context(shown below) of the GraphQL is builded in the **graphqlLoader.ts** file. Inside of this loader we create a scoped container for each incoming request.

```typescript
export interface Context {
  requestId: number;
  request: express.Request;
  response: express.Response;
  container: ContainerInstance;
}
```

## ❯ Further Documentation

(WIP)

<br>
<hr color="#b9cced">


## ❯ License

(WIP)