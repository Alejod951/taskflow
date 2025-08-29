import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../services/authContext";


export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  

  

  

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        TaskFlow
      </Link>

      {/* Menú en pantallas grandes */}
      <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
        <li>
          <Link to="/boards" className="hover:scale-105 transition-transform">
            Tableros
          </Link>
        </li>
        

        {!isAuthenticated ? (
          <li>
            <Link
              to="/login"
              className="hover:scale-105 transition-transform text-indigo-600 font-semibold"
            >
              Login / Sign in
            </Link>
          </li>
        ) : (
          <>
            
            <li
              onClick={logout}
              className="hover:scale-105 transition-transform text-red-600 cursor-pointer"
            >
              Logout
            </li>

            
          </>
        )}
      </ul>

      {/* Botón menú móvil */}
      <button
        className="md:hidden p-2 rounded-lg bg-indigo-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-xl p-4 w-48 flex flex-col gap-3 text-gray-800 font-medium">
          <Link to="/boards" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>
            Tableros
          </Link>
          

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="text-indigo-600 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Login / Sign in
            </Link>
          ) : (
            <>
              
              <span
                onClick={logout}
                className="cursor-pointer text-red-600"
              >
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
