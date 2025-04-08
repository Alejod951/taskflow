const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBoard = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const board = await prisma.board.create({ data: { title, userId } });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tablero" });
  }
};

const getBoards = async (req, res) => {
  const userId = req.user.userId;
  try {
    const boards = await prisma.board.findMany({ where: { userId }, include: { tasks: true } });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tableros" });
  }
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const board = await prisma.board.update({ where: { id, userId }, data: { title } });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el tablero" });
  }
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await prisma.board.delete({ where: { id, userId } });
    res.json({ message: "Tablero eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tablero" });
  }
};

module.exports = { createBoard, getBoards, updateBoard, deleteBoard };
