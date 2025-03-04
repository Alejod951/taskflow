require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth");





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

app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    // Verificar si el usuario ya existe
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Usuario ya registrado" });
  
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Crear el usuario
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  
    res.json({ message: "Usuario registrado correctamente", user });
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
  
    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });
  
    // Generar token JWT
    const token = jwt.sign({ userId: user.id }, "secreto", { expiresIn: "1h" });
  
    res.json({ message: "Login exitoso", token });
  });

  app.get("/api/protegido", authMiddleware, (req, res) => {
    res.json({ message: "Acceso permitido", userId: req.user.userId });
  });
  


