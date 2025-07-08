import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import aboutRoute from "./src/routes/about.routes";
import router from "./src/routes/about.routes";
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express application

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/about", aboutRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
