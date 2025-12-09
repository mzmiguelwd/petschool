import React from "react";
import { LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const NavbarDirector = ({ onLogout }) => {
  const { auth } = useAuth();

  const links = [
    { name: "Dashboard", href: "/director/dashboard" },
    { name: "Asistencias", href: "/director/asistencias" },
    // Agrega aquí más enlaces según sea necesario
  ];

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-700">Panel del Director</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="inline-block transform transition-transform duration-300 font-medium text-base sm:text-md hover:scale-110 hover:text-[var(--primary-button)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="flex items-center space-x-1 hover:scale-110 transform transition-transform cursor-pointer duration-300 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          <span>Salir</span>
        </button>
      </div>
    </nav>
  );
};

export default NavbarDirector;
