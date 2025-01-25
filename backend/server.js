const express = require ('express');
const cors = require ('cors');
const cookieParser = require('cookie-parser')
const connectDB = require ('./db.js');

const { login } = require ('./controllers/loginController.js');
const { register } = require ('./controllers/registrationController.js');
const { booking }  = require ('./controllers/bookingController.js');
const { verifyUser } = require ('./middleware/authMiddleware.js');

const app = express ()

app.use (express.json());
app.use (cors ({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use (cookieParser ());

// Check whether the user is an authenticated user
app.get ('/login', verifyUser, (req, res) => {
    return res.json ({ Status: "Success", username: req.username });
})

app.post ('/login', login);
app.post ('/register', register);
app.post ('/booking', booking);

app.listen (5000, () => { console.log ("Server started on port 5000") })