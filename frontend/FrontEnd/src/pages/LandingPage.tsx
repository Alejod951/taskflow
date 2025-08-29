import { CheckCircle, Users, Bell, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">
          Bienvenido a TaskFlow
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Organiza tus tareas, colabora en equipo y logra más en menos tiempo.
        </p>
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Comenzar ahora
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        <div>
          <CheckCircle className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold">Crea tableros</h3>
          <p className="text-gray-600 text-sm">
            Diseña proyectos a tu manera con tableros personalizados.
          </p>
        </div>
        <div>
          <Users className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold">Colaboración</h3>
          <p className="text-gray-600 text-sm">
            Trabaja en equipo y comparte tareas en tiempo real.
          </p>
        </div>
        <div>
          <Bell className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold">Notificaciones</h3>
          <p className="text-gray-600 text-sm">
            Mantente al día con recordatorios instantáneos.
          </p>
        </div>
        <div>
          <BarChart className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold">Progreso</h3>
          <p className="text-gray-600 text-sm">
            Visualiza tu productividad con estadísticas claras.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-20 bg-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Empieza gratis y organiza tu vida hoy
        </h2>
        <Link
          to="/register"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Registrarme
        </Link>
      </section>
    </div>
  );
}
