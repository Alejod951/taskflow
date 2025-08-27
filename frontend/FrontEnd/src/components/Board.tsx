import { useEffect, useState } from "react";
import { getBoards, createBoard, updateBoard, Board } from "../services/useApi";
import { Link } from "react-router-dom";

const BoardComponent = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editedBoardTitle, setEditedBoardTitle] = useState("");

  const fetchBoards = async () => {
    try {
      const data = await getBoards();
      const sorted = data.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setBoards(sorted);
    } catch (error) {
      console.error("❌ Error al obtener tableros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim()) return;
    try {
      await createBoard(newBoardTitle);
      setNewBoardTitle("");
      fetchBoards();
    } catch (error) {
      console.error("❌ Error al crear tablero:", error);
    }
  };

  const handleEditBoard = (board: Board) => {
    setEditingBoardId(board.id);
    setEditedBoardTitle(board.title);
  };

  const handleSaveBoard = async () => {
    if (!editingBoardId || !editedBoardTitle.trim()) return;
    try {
      await updateBoard(editingBoardId, { title: editedBoardTitle });
      setEditingBoardId(null);
      setEditedBoardTitle("");
      fetchBoards();
    } catch (error) {
      console.error("❌ Error al actualizar tablero:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBoardId(null);
    setEditedBoardTitle("");
  };

  return (
    <div>
      <h1>Mis Tableros</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nombre del tablero"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
        />
        <button onClick={handleCreateBoard}>Crear tablero</button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : boards.length === 0 ? (
        <p>No hay tableros.</p>
      ) : (
        <ul>
          {boards.map((board) => (
            <li key={board.id} style={{ marginBottom: "0.5rem" }}>
              {editingBoardId === board.id ? (
                <>
                  <input
                    type="text"
                    value={editedBoardTitle}
                    onChange={(e) => setEditedBoardTitle(e.target.value)}
                  />
                  <button onClick={handleSaveBoard}>Guardar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  {/* 🔗 Link hacia el detalle */}
                  <Link to={`/boards/${board.id}`}>{board.title}</Link>
                  <button
                    style={{ marginLeft: "0.5rem" }}
                    onClick={() => handleEditBoard(board)}
                  >
                    Editar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardComponent;
