import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

const NavBarCliente = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth } = useAuth();

  const links = [
    { name: "Mi perfil", href: "/profile" },
    { name: "Mis Caninos", href: "/caninos" },
    { name: "Historial de pagos", href: "/pagos" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            🐶 Panel de {auth?.user?.first_name || "Usuario"}
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={onLogout}
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Salir</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBarCliente;
