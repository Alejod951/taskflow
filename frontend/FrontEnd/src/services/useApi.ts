import api from "../api";

/* =========================
   INTERFACES
========================= */
export interface Board {
  id: string;
  title: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  boardId: string;
  createdAt: string;
}

/* =========================
   BOARDS
========================= */
export const getBoards = async (): Promise<Board[]> => {
  try {
    const res = await api.get<Board[]>("/boards");
    return res.data || [];
  } catch (error) {
    console.error("Error obteniendo boards:", error);
    return [];
  }
};

export const createBoard = async (title: string): Promise<Board | null> => {
  if (!title.trim()) {
    console.warn("El título de la board no puede estar vacío");
    return null;
  }

  try {
    const res = await api.post<Board>("/boards", { title });
    return res.data;
  } catch (error) {
    console.error("Error creando board:", error);
    return null;
  }
};

export const updateBoard = async (id: string, updates: { title: string }) => {
  const res = await api.put<Board>(`/boards/${id}`, updates);
  return res.data;
};

export const deleteBoard = async (id: string): Promise<boolean> => {
  if (!id) {
    console.warn("ID inválido para eliminar la board");
    return false;
  }

  try {
    await api.delete(`/boards/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando board:", error);
    return false;
  }
};



/* =========================
   TASKS
========================= */
export const getTasks = async (boardId: string): Promise<Task[]> => {
  const res = await api.get<Task[]>(`/tasks/${boardId}`);
  return res.data;
};

// 📌 Crear una nueva tarea
export const createTask = async (task: {
  title: string;
  boardId: string;
  description?: string;
}): Promise<Task> => {
  const res = await api.post<Task>("/tasks", task);
  return res.data;
};

// 📌 Actualizar una tarea
export const updateTask = async (
  id: string,
  updatedTask: Partial<Task>
): Promise<Task> => {
  const res = await api.put<Task>(`/tasks/${id}`, updatedTask);
  return res.data;
};

// 📌 Eliminar una tarea
export const deleteTask = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/tasks/${id}`);
  return res.data;
};
