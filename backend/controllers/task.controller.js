const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Crear tarea
const createTask = async (req, res) => {
  const { title, boardId, description } = req.body;

  try {
    // Verificar si existe el board
    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board) {
      return res.status(404).json({ message: "Board no encontrado" });
    }

    // Crear la tarea solo con boardId, NO con board
    const task = await prisma.task.create({
      data: {
        title,
        description: description || "",
        boardId, // <- esto es suficiente
      },
    });

    res.json(task);
  } catch (error) {
    console.error("❌ Error al crear tarea:", error);
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

// Obtener tareas de un board
const getTasks = async (req, res) => {
  const { boardId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { boardId },
      orderBy: { createdAt: "asc" }, // para que no cambie el orden
    });
    res.json(tasks);
  } catch (error) {
    console.error("❌ Error al obtener tareas:", error);
    res.status(500).json({ message: `Error al obtener las tareas del board ${boardId}`, error });
  }
};

// Actualizar tarea
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed, description } = req.body;

  console.log(id);

  try {
    // Validación mínima
    if (!id) {
      return res.status(400).json({ message: "Falta el ID de la tarea" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
        ...(description !== undefined && { description }),
      },
    });

    res.json(task);
  } catch (error) {
    console.error("❌ Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id },
    });
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar tarea:", error);
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
