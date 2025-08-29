const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./auth/googleAuth");



const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/boards.routes");
const taskRoutes = require("./routes/task.routes");


const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running! 🚀");
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
