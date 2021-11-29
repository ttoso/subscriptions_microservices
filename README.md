# Subscription microservice
## Deploy the service
All the sevices are managed using docker compose, so you should have it installed locally no need to have any other thechnology instaled.

run
```
docker-compose up --build
```
to start all the containers. The kafka image for development would need a manual restarting if fails on starting.
Once all containers are running the public service will be exposed at localhost:3000.

## Create the kafka topics
Once the servers are up you will need to enter the email service one and run
```
node src/kafka/create_topics.js
```
This sicript will create the necessaryi topics in the kafka development instance.

## Generate a jwt for the request
This sistem have a jwt for authorization, this is thinked to work with an external auth server where you can get the jwt.
To mock it you can use the script placed in ./public_service/src/middleware/jwtGenerator.js which will provide you a valid jwt
that you can add to the request header with the key x-access-token.

## Packages used
- Express as the framework to build the Rest apis
- Joi as the library to validate the endpoint requests body
- Kafkajs as the library to connect to kafka from JS
- Mongoose as the ORM to connect to mongo from JS
- Axios as the library to make http requests
- Jsonwebtoken as the library to authenticate the token provided to the requests
- Kafka image to have a local instance for development
- Mongo express container connected to mongo db to have a GUI for the db.

## API Reference
The api is defined in the swagger.yaml file, it can be visualized with an vscode extension for example