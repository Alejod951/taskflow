const express = require("express");
const authMiddleware = require("../middleware/auth");
const { createBoard, getBoards, updateBoard, deleteBoard } = require("../controllers/boards.controller");

const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);
router.put("/:id", authMiddleware, updateBoard);
router.delete("/:id", authMiddleware, deleteBoard);

module.exports = router;
