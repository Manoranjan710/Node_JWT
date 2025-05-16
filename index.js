const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware"); // Import the auth middleware
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// If you want to restrict it to Vercel or local frontend, use:
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'], // adjust to your frontend
  credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes); // Add authMiddleware here if you want to protect it

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
