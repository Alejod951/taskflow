import { useEffect, useState } from "react";
import { getBoards, createBoard, updateBoard, Board, deleteBoard } from "../services/useApi";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Check, X, Plus } from "lucide-react";


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

const handleDeleteBoard = async (id: string) => {
  if (!confirm("¿Seguro que quieres eliminar este tablero?")) return;
  try {
    await deleteBoard(id);
    fetchBoards(); // recarga la lista
  } catch (error) {
    console.error("❌ Error al eliminar tablero:", error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Mis Tableros</h1>

      {/* Crear tablero */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Nombre del tablero"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleCreateBoard}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
        <Plus size={18} />
          Crear
        </button>
      </div>

      {/* Lista de tableros */}
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : boards.length === 0 ? (
        <p className="text-gray-500">No hay tableros.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board.id}
              className="p-4 bg-white shadow-md rounded-xl flex justify-between items-center hover:shadow-lg transition"
            >
              {editingBoardId === board.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editedBoardTitle}
                    onChange={(e) => setEditedBoardTitle(e.target.value)}
                    className="flex-1 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSaveBoard}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <>
                  {/* 🔗 Link hacia el detalle */}
                  <Link
  to={`/boards/${board.id}`}
  state={{ boardName: board.title }}
  className="font-medium text-gray-800 hover:text-indigo-600 transition"
>
  {board.title}
</Link>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBoard(board)}
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBoard(board.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardComponent;
