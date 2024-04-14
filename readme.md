# vivacity backend screener

## running the project 
- install/run postgres server, note credentials/parameters
- clone repo
- npm install
- create .env file with fields set
  - EXPRESS_URL=
  - EXPRESS_PORT=
  - POSTGRES_DATABASE=
  - POSTGRES_USER=
  - POSTGRES_PASSWORD=
  - POSTGRES_HOST=
  - POSTGRES_PORT=
- npm start 

## running tests 
- npm test 

## notes 
- did not do type-hinting / type-checking too much. see my recent project 
- would have added: 
  - containerization
  - type-checking
  - validators
  - error handling
  -  logging
- challenges: 
  - this was not too tough
  - used sequelize ORM, was a little bit tricky to learn how to use  
