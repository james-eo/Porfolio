import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/utils/db";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express application

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
