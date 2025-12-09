import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar Link y useNavigate
import useAuth from "../hooks/useAuth";
import { LogOut } from "lucide-react"; 

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAuth } = useAuth(); 
  const navigate = useNavigate();

  const navbarLinks = [
    {
      id: 1,
      title: "Dashboard",
      link: "/admin/dashboard", 
    },
    {
      id: 2,
      title: "Gestión de Usuarios",
      link: "/admin/users-management", 
    },
  ];
  
  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
      setAuth({}); 
      navigate('/login'); 
  };


  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#f7f8f6]/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-12 sm:py-3">

        <div className="flex items-center gap-4">
          <svg
            className="h-8 w-8 text-[var(--primary-color)]"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
          <h2 className="text-xl font-bold">PetSchool</h2>
        </div>

        {/* --- Hamburger Button (Mobile Only) --- */}
        <button 
            onClick={toogleMenu} 
            className="md:hidden text-gray-800 focus:outline-none" 
            aria-label="Toggle menu"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                {isOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
            </svg>
        </button>

        <div className="hidden md:block">
          <ul className="flex space-x-4 sm:space-x-8">
            {navbarLinks.map((link) => {
              return (
                <li key={link.id}>
                  {/* 🔥 Usar Link de react-router-dom */}
                  <Link
                    className="inline-block font-medium text-base sm:text-md transform transition-transform duration-300 hover:scale-110 text-gray-800 hover:text-[var(--primary-color)]"
                    to={link.link} 
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- Action Button Section (Logout) --- */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout} 
            className="flex items-center py-2 px-4 rounded-3xl text-base font-medium bg-[#80ec13] cursor-pointer transition-all duration-300 hover:bg-[#FFD54F] hover:text-[#2E7D32] active:scale-95"
          >
            <LogOut size={16} className="mr-2 hidden sm:inline" />
             Salir
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <div
        className={`md:hidden absolute w-full bg-[#3c3c3c] transition-all duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`} 
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarLinks.map((link) => {
            return (
              <li key={link.id} className="py-2 text-center">
                <Link
                  className="text-white hover:text-sky-200"
                  to={link.link}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
          {/* Opción Cerrar Sesión en el menú móvil */}
          <li className="py-2 text-center mt-2 border-t border-gray-700">
             <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-red-400 font-semibold hover:text-red-300 py-1"
             >
                Salir
             </button>
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default NavbarAdmin;