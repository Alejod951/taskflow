const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTask = async (req, res) => {
  const { title, boardId } = req.body;

  try {
    const task = await prisma.task.create({
      data: { title, boardId },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

const getTasks = async (req, res) => {
  const { boardId } = req.params;

  try {
    const tasks = await prisma.task.findMany({ where: { boardId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id } });
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
