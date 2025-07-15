import { useState } from 'react';
import axios from 'axios';

type LoginResponse = {
  token: string;
};

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Por favor ingresa tu correo y contraseña.');
      return;
    }

    try {
      const res = await axios.post<LoginResponse>(
        'http://localhost:5100/api/auth/login',
        { email, password }
      );

      localStorage.setItem('token', res.data.token);
      alert('¡Login exitoso!');
      window.location.reload(); // recargar para que la app use el token
    } catch (error: any) {
      console.error('Error de login:', error);
      setErrorMsg('Credenciales inválidas o error del servidor.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />

      <button onClick={handleLogin} style={{ width: '100%' }}>
        Ingresar
      </button>
    </div>
  );
}

export default LoginForm;
