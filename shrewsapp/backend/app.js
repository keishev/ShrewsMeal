const express = require("express");
const cors = require("cors");
const app = express();

const loginRoutes = require ('./routes/loginRoutes');

app.use(
    cors({
        origin: 'http://localhost:3000',  // Set specific frontend URL, not '*'
        credentials: true,       // Allow cookies and authentication headers
    })
);

app.use (express.json());

app.use ("/api", loginRoutes);

module.exports = app;