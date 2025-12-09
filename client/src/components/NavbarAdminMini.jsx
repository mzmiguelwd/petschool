const NavbarAdminMini = ({ onLogout }) => {
  return (
    <nav className="w-full bg-[#f7f8f6]/80 backdrop-blur-md py-3 px-6 flex justify-end shadow">
      <button
        onClick={onLogout}
        className="py-2 px-4 rounded-3xl text-base font-medium bg-[#80ec13] cursor-pointer transition-all duration-300 hover:bg-[#FFD54F] hover:text-[#2E7D32] active:scale-90"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default NavbarAdminMini;