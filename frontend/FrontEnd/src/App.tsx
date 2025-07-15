import { useEffect, useState } from 'react';
import { getBoards, createBoard } from './services/useApi';
import { Board } from './services/useApi';
import LoginForm from './components/LoginForm';




function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const fetchBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (error) {
      console.error('Error al obtener los tableros:', error);
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
      setNewBoardTitle('');
      fetchBoards(); // vuelve a cargar la lista
    } catch (error) {
      console.error('Error al crear el tablero:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>

      <LoginForm></LoginForm>
      <h1>Mis Tableros</h1>

      <div style={{ marginBottom: '1rem' }}>
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
            <li key={board.id}>{board.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
