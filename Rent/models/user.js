// File: models/user.js
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');  // Use promise-based MySQL

// Create the connection to the database
const db = mysql.createPool({
  host: "localhost",          // Your MySQL host
  user: "root",               // Your MySQL username
  password: "",               // Your MySQL password
  database: "rental_system"   // Replace with your actual database name
});

// User Signup (Store user details)
const createUser = async (email, password, accountType) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const query = 'INSERT INTO users (email, password, account_type) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [email, hashedPassword, accountType]);
    return result;
  } catch (err) {
    throw err;
  }
};

// User Login (Validate user credentials)
const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;  // Return rows array
  } catch (err) {
    throw err;
  }
};

module.exports = { createUser, findUserByEmail };  // Export the functions
