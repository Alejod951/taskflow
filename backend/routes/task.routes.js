const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

// Aplica autenticación a todas las rutas
router.use(authMiddleware);

// Crear una tarea
router.post("/", createTask);

// Obtener tareas por boardId
router.get("/:boardId", getTasks);

// Actualizar tarea
router.put("/:id", updateTask);

// Eliminar tarea
router.delete("/:id", deleteTask);

module.exports = router;
