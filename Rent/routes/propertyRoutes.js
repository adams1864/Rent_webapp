// In routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const { getProperties, addProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");

// Define the routes
router.get("/properties", getProperties);

// POST for adding a property
router.post("/properties", addProperty);

// PUT for updating an existing property
router.put("/properties/:id", updateProperty); // Check if this is correctly referenced
router.delete("/properties/:id", deleteProperty);

module.exports = router;
