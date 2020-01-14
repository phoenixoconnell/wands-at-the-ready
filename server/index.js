//imports
require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');

//controllers


//dotenv
const { SERVER_PORT, DB_STRING } = process.env;


//middleware
app.use(express.json());


//massive
massive(DB_STRING).then(db => {
    app.set('db', db);
    console.log('DB Connected');
})

//endpoints


//listen
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})