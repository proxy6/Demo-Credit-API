# DEMO CREDIT API

### To run Locally 
##### Using Mysql in Docker 
* Make sure you have docker setup in your system
* Clone the repository using `git clone https://github.com/proxy6/Demo-Credit-API.git` 
* After cloning run `npm i` to install all necessary dependencies
* Create an `.env` file in root folder and follow the format in the envExample file to add your environmental variables
    - paste the following in your .env file created
        - NODE_ENV="development"
        - PORT=3500
        - DBNAME="democredit"
        - DBUSER='root'
        - DBPASSWORD=''
        - DBPORT=3306
* Run `docker compose -f docker-databse.yml up` to start up a mysql database in docker
* Run `npm run migrate` to migrate your database
* To start the application run `npm run start:dev`

##### Using Mysql locally installed in system 
* Make sure you have mysql installed and functional
* Clone the repository using `git clone https://github.com/proxy6/Demo-Credit-API.git` 
* After cloning run `npm i` to install all necessary dependencies
* Create an `.env` file in root folder and follow the format in the envExample file to add your environmental variables
* Run `npm run migrate` to migrate your database
* To start the application run `npm run start:dev`
### Endpoints
- ALL `http://localhost:{{PORT}}/`   // development
- ALL `https://progress-eze-lendsqr-be-test.herokuapp.com`  // production

### POSTMAN Documentation
- https://documenter.getpostman.com/view/22647528/2s8YYCskA1

### Heroku Link
https://progress-eze-lendsqr-be-test.herokuapp.com/


### Database Design Image
![Alt text](./database-design.png?raw=true "Database Design Image")

### Tech Stack
- Typescript
- Knex 
- Objection js
- Docker
- Jest
- Supertest
