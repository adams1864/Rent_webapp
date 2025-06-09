# Rental System

A rental property management web application built with Node.js, Express, MySQL, and Socket.io. This system allows users to sign up, log in, search for properties, and manage property listings.

## Features

- User authentication (signup & login)
- Property listing management (add, update, delete)
- Property search with filters (title, location, price range)
- Real-time messaging with Socket.io
- RESTful API endpoints
- MySQL database integration

## Project Structure

```
Rent/
├── .env
├── package.json
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── propertyController.js
├── models/
│   ├── property.js
│   └── user.js
├── public/
│   ├── *.html, *.css, *.js, images/
├── routes/
│   ├── authRoutes.js
│   └── propertyRoutes.js
├── uploads/
│   └── (uploaded images)
└── views/
    ├── signup.ejs
    └── login.ejs
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MySQL server

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Rent
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Edit `.env` with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=""
   DB_NAME=rental_system
   ```

4. **Set up the database:**

   Create a MySQL database named `rental_system` and the required tables (`users`, `properties`).

5. **Start the server:**
   ```sh
   npm start
   ```

6. **Access the app:**
   Open [http://localhost:5001/homepage.html](http://localhost:5001/homepage.html) in your browser.

## API Endpoints

- `POST /api/auth/signup` — User registration
- `POST /api/auth/login` — User login
- `GET /api/properties` — List all available properties
- `POST /api/properties` — Add a new property
- `PUT /api/properties/:id` — Update a property
- `DELETE /api/properties/:id` — Delete a property
- `GET /api/properties/search` — Search properties

## Technologies Used

- Node.js
- Express.js
- MySQL (mysql2)
- Socket.io
- bcryptjs
- dotenv
- body-parser
- cors

## License

This project is licensed under the ISC License.

---

**Note:** For production, update environment variables and security settings as needed.
