import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";
import DogIcon from "../assets/dog-icon.png";
import { Link } from "react-router-dom";

const NavbarCliente = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth } = useAuth();

  const links = [
    { name: "Dashboard", href: "/cliente/dashboard" },
    { name: "Perfil", href: "/cliente/profile" },
    { name: "Caninos", href: "/cliente/caninos" },
    { name: "Matriculas", href: "/cliente/matriculas" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#ffffff] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <div className="flex-shrink-0 text-xl font-bold">
            <Link to="/cliente/dashboard" className="flex items-center gap-2">
              <img
                src={DogIcon}
                alt="PetSchool Logo"
                className="h-8 w-8 transform transition-transform hover:scale-110"
              />
              <h2 className="text-xl font-bold">
                Bienvenido, {auth?.user?.first_name || "Usuario"}
              </h2>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="inline-block transform transition-transform duration-300 font-medium text-base sm:text-md hover:scale-110 hover:text-[var(--primary-button)]"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={onLogout}
              className="flex items-center space-x-1 hover:scale-110 transform transition-transform cursor-pointer duration-300 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
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

export default NavbarCliente;
