const express = require ('express');
const cors = require ('cors');
const connectDB = require ('./db.js');
const { login } = require ('./controllers/loginController.js');
const { register } = require ('./controllers/registrationController.js');

const app = express ()

app.use (express.json());
app.use (cors ());

app.post ('/login', register)

app.listen (5000, () => { console.log ("Server started on port 5000") })