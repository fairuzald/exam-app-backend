<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Backend Quiz App

This project is built using NestJS with PostgreSQL as the database and JWT for authentication. The application includes CRUD operations for quizzes and questions, along with comprehensive e2e testing.
This project using standard RESTful API conventions and is built using the NestJS framework especially in authorization and authentication.
I already make to use the JWT token for the authentication and authorization process with email verification and password reset.

## Features

1. **CRUD Operations**: Supports creating, reading, updating, and deleting users, quizzes, questions and options.
2. **Authentication**: Uses JWT tokens for securing endpoints related to the user and maintaining user sessions.
3. **Database**: Utilizes PostgreSQL hosted on [Neon][https://neon.tech/] for data storage.
4. **E2E Testing**: Comprehensive end-to-end tests covering all edge cases.

## Project Structure

The project is structured as follows:

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## CRUD Operations

The quiz has a one-to-many relationship with questions, and questions have a one-to-many relationship with options also the user has a one-to-many relationship with quizzes. I also already handle for enum and basic attribute constraints, integrity constraints, and foreign key constraints.
Based on the database schema, the following CRUD operations are supported:

### Quiz

- **Create a new quiz**
- **Get all quizzes**
- **Get a single quiz by ID**
- **Update a quiz**
- **Delete a quiz**

### Question

- **Create a new question**
- **Get all questions**
- **Get a single question by ID**
- **Update a question**
- **Delete a question**

### Option

- **Create a new option**
- **Get all options**
- **Get a single option by ID**
- **Update an option**
- **Delete an option**

## Authentication

- **Register**: Creates a new user.
- **Activate User**: Activates a user account.
- **Login**: Logs in a user and returns a JWT token.
- **Get Logged In User**: Returns the profile of the logged-in user.
- **Forgot Password**: Sends a password reset link.
- **Reset Password**: Resets the user's password.
- **Logout**: Logs out the user.
- **Update User**: Updates the user's profile.
- **Delete User**: Deletes the user's account.

## E2E Testing

E2E tests are written using Jest and Supertest. These tests cover various scenarios including valid normal case and invalid data, non-existent IDs, and UUID format errors.

## Patterns and Best Practices

## Modular Monolith

### 1. Modularity

- **Definisi**: Memisahkan kode berdasarkan fitur atau domain.
- **Keuntungan**: Pemeliharaan mudah, scalability, dan isolasi kesalahan.

### 2. Reusability

- **Definisi**: Menggunakan kembali kode di berbagai bagian aplikasi.
- **Keuntungan**: Efisiensi pengembangan dan konsistensi.

### 3. Testability

- **Definisi**: Memudahkan pengujian unit dan integrasi.
- **Keuntungan**: Pengujian lebih mudah dan mendukung automated testing.

## Domain-Driven Design (DDD)

### 1. Bounded Context

- **Definisi**: Menetapkan batasan yang jelas antara berbagai bagian domain model.
- **Keuntungan**: Kejelasan dan fokus, serta komunikasi yang jelas.

### 2. Entities dan Value Objects

- **Definisi**: Memodelkan data dan perilaku domain dengan entitas dan objek nilai.
- **Keuntungan**: Model domain yang kaya dan konsistensi data.

### 3. Repositories

- **Definisi**: Memisahkan logika akses data dari logika bisnis.
- **Keuntungan**: Separation of concerns dan memudahkan pengujian dengan mocking.
