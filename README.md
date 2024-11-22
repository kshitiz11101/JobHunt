## JOB HUNT
Job Hunt is a comprehensive Job Application System where job seekers can easily browse and apply for job postings.Enabled employers to post job and internship opportunities with detailed requirements and descriptions. 

### Technologies Used:

## Frontend:

React.js: For building the user interface.
Tailwind CSS: For Styling the components.
Redux Toolkit: For State Management.

## Backend:

Springboot: For the server-side runtime environment.
PostgreSQL: As the database to store user and post data.

## Prerequisites

[![React](https://img.shields.io/badge/React-%5E17.0.0-blue)](https://reactjs.org/)
[![Springboot](https://img.shields.io/badge/Springboot-%5E2)](https://start.spring.io/)

## Getting Started

Follow these steps to set up and run the project locally.

## Frontend

###  Clone the Repository

```bash
git clone https://github.com/kshitiz11101/JobHunt
cd client
npm install
npm run dev
```

## BACKEND

```bash
cd server
mvn clean install
mvn spring-boot:run

```

## Configure application.properties on server side

Open the application.properties file in src/main/resources
```bash
spring.application.name=server
spring.datasource.url=database_url
spring.datasource.username=database_username
spring.datasource.password=database_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

```