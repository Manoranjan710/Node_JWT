const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware"); // Import the auth middleware


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes); // Add authMiddleware here if you want to protect it

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
