const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const loginRoutes = require ('./routes/loginRoutes');
const bookingRoutes = require ('./routes/bookingRoutes');
const registrationRoutes = require ('./routes/registrationRoutes');

app.use (cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',  // Set specific frontend URL, not '*'
        credentials: true,       // Allow cookies and authentication headers
    })
);

app.use (express.json());

app.use ("/api", loginRoutes);
app.use ("/api", bookingRoutes);
app.use ("/api", registrationRoutes);

module.exports = app;