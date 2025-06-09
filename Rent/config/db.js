// config/db.js
const mysql = require('mysql2/promise'); // Use mysql2 for async/await support

// Create a connection pool to the database
const db = mysql.createPool({
    host: process.env.DB_HOST,     // e.g., 'localhost'
    user: process.env.DB_USER,     // e.g., 'root'
    password: process.env.DB_PASS, // e.g., 'password'
    database: process.env.DB_NAME  // e.g., 'rental_system'
});

module.exports = db; // Export db to be used in other files
