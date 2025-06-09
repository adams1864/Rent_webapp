const db = require("../config/db");

class Property {
    // Fetch available properties
    static async getAvailableProperties() {
        const [rows] = await db.query("SELECT * FROM properties WHERE available = true");
        return rows;
    }

    // Create a new property
    static async createProperty({ title, description, price, location, image_url, available }) {
        const query = `
            INSERT INTO properties (title, description, price, location, image_url, available)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [title, description, price, location, image_url, available || 1];
        return db.query(query, values);
    }

    // Update an existing property
    static async updateProperty(id, { title, description, price, location, image_url, available }) {
        const query = `
            UPDATE properties
            SET title = ?, description = ?, price = ?, location = ?, image_url = ?, available = ?
            WHERE id = ?
        `;
        const values = [title, description, price, location, image_url, available, id];
        return db.query(query, values);
    }
    // Delete a property
    static async deleteProperty(id) {
        const query = `DELETE FROM properties WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result;
    }
    
}

module.exports = Property;
