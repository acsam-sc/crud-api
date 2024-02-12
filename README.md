1. Install [Node.js](https://nodejs.org/en/download/)   
2. Fork this repository: https://github.com/acsam-sc/crud-api
3. Clone your newly created repo locally: https://github.com/<%your_github_username%>/crud-api/ 
4. Go to folder `crud-api`  
5. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)  
6. Run `npm run start:dev` in command line to start server.

Implemented endpoints:
    - **GET** `api/users` is used to get all users
    - **GET** `api/users/{userId}` is used to get with userId
    - **POST** `api/users` is used to create record about new user and store it in database
    - **PUT** `api/users/{userId}` is used to update existing user
    - **DELETE** `api/users/{userId}` is used to delete existing user from database

POST and PUT requests must contain body with JSON, containing:
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

userId is generated on server side and shown as parameter "id" in user object.

Server port can be set in .env file(see example in .env.example)