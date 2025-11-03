import React from "react";
import { LogOut, User, BarChart3 } from "lucide-react";

const NavBarDirector = ({ onLogout }) => {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <BarChart3 className="text-blue-600 w-6 h-6" />
        <h1 className="text-xl font-semibold text-gray-700">Panel del Director</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="w-5 h-5" />
          <span>Director</span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          <span>Salir</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBarDirector;
