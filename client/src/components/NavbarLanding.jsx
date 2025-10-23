import { useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { navbarLinks, navbarSocials } from "../data/navbarLandingData";

import DogIcon from "../assets/dog-icon.png";

const NavbarLanding = () => {
  // State to control the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the state of the mobile menu (open/closed).
  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#ffffff] shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3 sm:px-12 sm:py-3">
        {/* --- Logo Section --- */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={DogIcon}
              alt="PetSchool Logo"
              className="h-8 w-8 transform transition-transform hover:scale-110"
            />
            <h2 className="text-xl font-bold">PetSchool</h2>
          </Link>
        </div>

        {/* --- Hamburger Button (Visible only on Mobile) --- */}
        <button
          onClick={toogleMenu}
          className="md:hidden text-gray-800 focud:outline-none"
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

        {/* --- Desktop Navigation Links (Hidden on Mobile) --- */}
        <div className="hidden md:block">
          <ul className="flex space-x-4 sm:space-x-8">
            {navbarLinks.map((link) => {
              return (
                <li key={link.id}>
                  <a
                    className="inline-block transform transition-transform duration-300 font-medium text-base sm:text-md hover:scale-110 hover:text-[var(--primary-button)]"
                    href={link.link}
                  >
                    {link.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- Authentication Buttons (Always Visible) --- */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/">
            <SecondaryButton text="Iniciar Sesión" />
          </Link>

          <Link to="/register">
            <PrimaryButton text="Registrarme" />
          </Link>
        </div>
      </div>

      {/* --- Mobile Menu (Dropdown) --- */}
      <div
        className={`md:hidden absolute top-full w-full bg-purple-950 transition-all duration-300 ease-in-out ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* --- Mobile Links List --- */}
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

        {/* --- Social Icons List --- */}
        <ul className="flex justify-center space-x-4 border-t border-purple-700 px-4 py-3">
          {navbarSocials.map((link) => {
            return (
              <li key={link.id}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                >
                  {/* --- Social Icon --- */}
                  <i
                    className={`${link.icon} text-lg text-white hover:text-color-sky-200`}
                  ></i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLanding;
