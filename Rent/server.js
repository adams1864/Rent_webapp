require('dotenv').config(); // This loads the variables from .env

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); 
const propertyRoutes = require("./routes/propertyRoutes"); 
const { signup, login } = require("./controllers/authController");  // Import your controller functions

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json());
app.use("/api", propertyRoutes);

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server
const http = require('http');
const server = http.createServer(app);

// Initialize socket.io
const socketIo = require('socket.io');
const io = socketIo(server);

// Handle incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages
    socket.on('sendMessage', (messageData) => {
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', messageData);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Routes
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);
app.use("/api", propertyRoutes); 

// Serve homepage.html when a user visits /homepage.html
app.get("/homepage.html", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Search properties route
app.get("/api/properties/search", async (req, res) => {
  const { title, location, minPrice, maxPrice } = req.query;

  let query = 'SELECT * FROM properties WHERE available = true';
  const queryParams = [];

  // Dynamically add filters only if the parameter is present
  if (title) {
    query += ' AND title LIKE ?';
    queryParams.push(`%${title}%`);
  }

  if (location) {
    query += ' AND location LIKE ?';
    queryParams.push(`%${location}%`);
  }

  if (minPrice) {
    query += ' AND price >= ?';
    queryParams.push(minPrice);
  }

  if (maxPrice) {
    query += ' AND price <= ?';
    queryParams.push(maxPrice);
  }

  console.log('SQL Query:', query); // Log the query for debugging
  console.log('Query Params:', queryParams); // Log the query parameters for debugging

  try {
    const [rows] = await db.query(query, queryParams);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

// Fetch property by id
app.get('/api/properties/:id', async (req, res) => {
  const propertyId = req.params.id;

  // Fetch property from the database (you can adjust this to match your database logic)
  const property = await db.query('SELECT * FROM properties WHERE id = ?', [propertyId]);

  if (property.length === 0) {
      return res.status(404).json({ success: false, message: 'Property not found' });
  }

  res.json({ success: true, property: property[0] });
});

// Start server
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
