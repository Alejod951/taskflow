const express = require("express");
const passport = require("passport");
const { signup, login, protegido } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();   // 👈 aquí defines router
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

// Signup normal
router.post("/signup", signup);

// Login normal
router.post("/login", login);

// Ruta protegida de prueba
router.get("/protegido", protegido, authMiddleware);

// Login con Google OAuth button (usando @react-oauth/google)
router.post("/google/callback", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID_GOOGLE,
    });

    const payload = ticket.getPayload();

    let user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await prisma.user.create({
        data: { name: payload.name, email: payload.email, password: "" },
      });
    }

    const appToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: appToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Google login failed" });
  }
});

module.exports = router;
