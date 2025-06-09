// File: controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/user");  // Import the functions

exports.signup = async (req, res) => {
    const { email, password, accountType } = req.body;

    // Validate input
    if (!email || !password || !accountType) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findUserByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Create new user
        await User.createUser(email, password, accountType);
        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error!" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Find user in database
        const user = await User.findUserByEmail(email);

        if (!user.length) {
            return res.status(400).json({ message: "User not found!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Send JSON response with redirect URL
        res.status(200).json({ message: "Login successful", redirectUrl: "/homepage.html" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error!" });
    }
};
