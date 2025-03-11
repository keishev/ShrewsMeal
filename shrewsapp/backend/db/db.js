const mysql = require("mysql2/promise");
const dotenv= require("dotenv");
dotenv.config({ path: "D:/ProgrammingProjects/ShrewsMeal/ShrewsMeal/shrewsapp/.env" });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
});

// Test database connection
async function testDatabaseConnection() {
    try {
        const [rows, fields] = await pool.query('SELECT 1');
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
}

// Call the test function
testDatabaseConnection();

module.exports = pool;