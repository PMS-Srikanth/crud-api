# User CRUD API

A simple and robust RESTful API built with Node.js, Express, and MongoDB for managing user data.

## Features
- **Create**: Add new users to the database.
- **Read**: Fetch all users or a specific user by ID.
- **Update**: Modify existing user details.
- **Delete**: Remove a user from the database.

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- dotenv (for environment variables)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PMS-Srikanth/crud-api.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.
