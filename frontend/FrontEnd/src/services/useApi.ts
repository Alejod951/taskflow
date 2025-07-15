import api from '../api';


export interface Board {
  id: string;
  title: string;
  createdAt: string;
}

export const getBoards = async (): Promise<Board[]> => {
  const res = await api.get<Board[]>('/boards');
  return res.data;
};

export const createBoard = async (title: string) => {
  const response = await api.post('/boards', { title });
  return response.data;
};

