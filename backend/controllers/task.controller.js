const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTask = async (req, res) => {
  const { title, boardId } = req.body;

  try {
    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board) return res.status(404).json({ message: "Board no encontrado" });

    const task = await prisma.task.create({
      data: { title, boardId },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};


const getTasks = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user.userId;

  try {
    const tasks = await prisma.task({
      where: { boardId, userId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener las tareas ${boardId} ` , error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed, description } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.updateMany({
      where: { id, userId },
      data: { title, completed, description },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await prisma.task.deleteMany({ where: { id, userId } });
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
