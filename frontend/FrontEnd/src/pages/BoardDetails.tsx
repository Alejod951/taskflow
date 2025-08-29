import { useEffect, useState } from "react";
import { useParams, Link, useLocation} from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask, Task } from "../services/useApi";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";




const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const location = useLocation();
  const boardName = (location.state as { boardName?: string })?.boardName;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");





  const fetchTasks = async () => {
    try {
      if (boardId) {
        const data = await getTasks(boardId);
        setTasks(data);
      }
    } catch (error) {
      console.error("❌ Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [boardId]);

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim() || !boardId) return;
    try {
      await createTask({ title: newTaskTitle, description: newTaskDescription, boardId });
      setNewTaskTitle("");
      setNewTaskDescription("");
      fetchTasks();
    } catch (error) {
      console.error("❌ Error al crear tarea:", error);
    }
  };

  const handleToggleCompleted = async (task: Task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error("❌ Error al actualizar tarea:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask.id, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("❌ Error al editar tarea:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Botón de volver */}
      <div className="flex items-center mb-6">
        <Link
          to="/boards"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <ArrowLeft size={20} /> Volver a Tableros
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalle del Tablero {boardName ?? "Cargando..."} </h2>

      {/* Crear tarea */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Título de la nueva tarea"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 border rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Descripción de la tarea"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="flex-1 border rounded-lg p-2"
        />
        <button
          onClick={handleCreateTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus size={18} /> Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      {loading ? (
        <p className="text-gray-500">Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white shadow rounded-lg flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task)}
                  className="mt-1"
                />

                {editingTask?.id === task.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded-lg p-2"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border rounded-lg p-2"
                    />
                  </div>
                ) : (
                  <div>
                    <span
                      className={`font-semibold ${
                        task.completed ? "line-through text-gray-500" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </span>
                    <p className="text-sm text-gray-600 italic">
                      {task.description || "Sin descripción"}
                    </p>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-2 mt-3 md:mt-0">
                {editingTask?.id === task.id ? (
                  <>
                    <button
                      onClick={handleUpdateTask}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                    >
                      <Save size={16} /> Guardar
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                    >
                      <X size={16} /> Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(task)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardDetail;
