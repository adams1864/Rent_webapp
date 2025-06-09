// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController"); // Import the functions

// POST route for signup
router.post("/signup", signup);  // Use the imported signup function

// POST route for login
router.post("/login", login);  // Use the imported login function

module.exports = router;
