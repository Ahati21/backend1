// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config(); // to read .env locally

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // e.g., provided by Railway
  user: process.env.DB_USER, // Railway MySQL user
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Make db accessible in routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Task Tracker API is running");
});

// Listen on dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
