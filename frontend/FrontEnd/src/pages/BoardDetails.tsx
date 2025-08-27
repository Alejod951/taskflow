import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask, Task } from "../services/useApi";

const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
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
    <div style={{ padding: "2rem" }}>
      <h2>Detalle del Tablero</h2>
      <Link to="/">⬅ Volver</Link>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Título de la nueva tarea"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción de la tarea"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={handleCreateTask}>Agregar tarea</button>
      </div>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "1rem" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task)}
              />
              {editingTask?.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={handleUpdateTask}>Guardar</button>
                  <button onClick={() => setEditingTask(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      marginLeft: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {task.title}
                  </span>
                  <p style={{ margin: "0.2rem 0 0 1.5rem", fontStyle: "italic" }}>
                    {task.description || "Sin descripción"}
                  </p>
                  <button
                    style={{ marginLeft: "1rem", color: "blue" }}
                    onClick={() => startEditing(task)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ marginLeft: "1rem", color: "red" }}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Eliminar
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

export default BoardDetail;
