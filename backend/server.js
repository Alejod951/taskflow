require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json());

app.get("/", (req, res) => {
    res.send("TaskFlow Backend is running! 🚀");
});

app.get("/api/test", (req, res) => {
    res.json({ message: "¡Backend conectado correctamente!" });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
