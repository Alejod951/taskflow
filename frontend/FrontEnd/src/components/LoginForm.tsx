import { useState } from "react";
import axios from "axios";
import { Link,useNavigate  } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "../services/authContext";

type LoginResponse = {
  token: string;
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:5100/api/auth/login",
        { email, password }
      );

      
      alert("¡Login exitoso!");
      login(res.data.token);
      navigate("/boards"); // recargar para que la app use el token
    } catch (error: any) {
      console.error("Error de login:", error);
      setErrorMsg("Credenciales inválidas o error del servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 px-4">
  <div className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white">
        
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Iniciar Sesión
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        {/* Botón de Login */}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-4"
        >
          Ingresar
        </button>

        {/* Separador */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">o</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Botón de Google */}
        <GoogleLoginButton />

        {/* Registrarse */}
        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
