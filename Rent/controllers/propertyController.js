const Property = require("../models/property");
exports.getProperties = async (req, res) => {
    try {
        const { title, location, minPrice, maxPrice } = req.query;
        let query = "SELECT * FROM properties WHERE available = true";
        const params = [];

        if (title) {
            query += " AND title LIKE ?";
            params.push(`%${title}%`);
        }
        if (location) {
            query += " AND location LIKE ?";
            params.push(`%${location}%`);
        }
        if (minPrice) {
            query += " AND price >= ?";
            params.push(Number(minPrice));
        }
        if (maxPrice) {
            query += " AND price <= ?";
            params.push(Number(maxPrice));
        }

        const [rows] = await require("../config/db").query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties!" });
    }
};
// Add a new property


// Edit an existing property
exports.addProperty = async (req, res) => {
    const { title, description, price, location, image_url, available } = req.body;

    try {
        await Property.createProperty({ title, description, price, location, image_url, available });
        res.status(201).json({ success: true, message: "Property added successfully!" });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(500).json({ success: false, message: "Failed to add property." });
    }
};
exports.updateProperty = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, image_url, available } = req.body;

    try {
        await Property.updateProperty(id, { title, description, price, location, image_url, available });
        res.json({ success: true, message: "Property updated successfully!" });
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ success: false, message: "Failed to update property." });
    }
};
exports.deleteProperty = async (req, res) => {
    const { id } = req.params; // Make sure you're correctly extracting 'id'

    try {
        const result = await Property.deleteProperty(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Property not found." });
        }
        res.json({ success: true, message: "Property deleted successfully!" });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ success: false, message: "Failed to delete property." });
    }
};

