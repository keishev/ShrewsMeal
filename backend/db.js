const mysql = require ('mysql2')

// Make a connection with the database
const connectDB = mysql.createConnection ({
    host: 'localhost',
    user: 'root', 
    password: 'ke1shashev1laROOTPASSWORD',
    database: 'shrewsmeal',
})

connectDB.connect ((err) => {
    if (err) {
        console.error ('Database connection failed', err.stack);
        return;
    }
    console.log ('Connected to the database');
});

module.exports = connectDB;