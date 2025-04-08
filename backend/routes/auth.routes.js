const express = require("express");
const passport = require("passport");
const { signup, login, protegido } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/protegido", protegido, authMiddleware);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({ message: "Login exitoso", token: req.user.token });
  }
);


module.exports = router;
