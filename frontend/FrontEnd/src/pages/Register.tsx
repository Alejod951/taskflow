import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Crear una cuenta
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Únete y empieza a organizar tus tareas fácilmente ✨
        </p>

        <form className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Confirmar Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition font-semibold"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-500 font-medium hover:text-indigo-600"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
