import { useState } from "react";
import { navbarLinks } from "../data/navbarAdminData";

const NavbarAdmin = () => {
  // State to control the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the state of the mobile menu (open/closed).
  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#f7f8f6]/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-12 sm:py-3">
        {/* --- Logo and Title Section --- */}
        <div className="flex items-center gap-4">
          <svg
            className="h-8 w-8 text-[var(--primary-color)]"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
              fill="currentColor"
            ></path>
          </svg>
          {/* --- Title --- */}
          <h2 className="text-xl font-bold">PetSchool</h2>
        </div>

        {/* --- Hamburger Button (Mobile Only) --- */}
        <button onClick={toogleMenu} className="md:hidden text-white">
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

        {/* --- Desktop Navigation Links --- */}
        <div className="hidden md:block">
          <ul className="flex space-x-4 sm:space-x-8">
            {navbarLinks.map((link) => {
              return (
                <li key={link.id}>
                  <a
                    className="inline-block font-medium text-base sm:text-md transform transition-transform duration-300 hover:scale-110 hover:text-[var(--primary-color)]"
                    href={link.link}
                  >
                    {link.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- Action Button Section (Logout) --- */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="py-2 px-4 items-center rounded-3xl text-base font-medium bg-[#80ec13] cursor-pointer transition-all duration-300 hover:bg-[#FFD54F] hover:text-[#2E7D32] active:scale-80"
          >
            Cerrar Sesión
          </a>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <div
        className={`md:hidden absolute w-full bg-purple-950 transition-all duration-300${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarLinks.map((link) => {
            return (
              <li key={link.id} className="py-2 text-center">
                <a
                  className="text-white hover:text-sky-200"
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
