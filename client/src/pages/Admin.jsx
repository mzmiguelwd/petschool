import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Users from "./Users"; // Componente de Gestión de Usuarios (UserManagement)
import NavbarAdmin from "../components/NavbarAdmin"; // Asegúrate de ajustar esta ruta
import UsersChart from "../components/charts/UsersChart"; // Asegúrate de ajustar esta ruta
import { getAllUsers } from "../api/users.api"; // Para obtener los datos de la API
import { Loader2 } from "lucide-react";

/**
 * Función auxiliar para contar usuarios por rol
 * @param {Array} users - Lista de usuarios recibida de la API.
 * @returns {Array} Datos para el chart.
 */
const countUsersByRole = (users) => {
    // Colores y nombres amigables para la gráfica
    const roleMap = {
        'admin': { name: 'Administrador', color: '#16a34a' }, // Verde
        'director': { name: 'Director', color: '#3f83f8' },  // Azul
        'cliente': { name: 'Cliente', color: '#f59e0b' },    // Amarillo/Naranja
    };

    const counts = { 'admin': 0, 'director': 0, 'cliente': 0 };

    users.forEach(user => {
        const roleKey = user.role.toLowerCase();
        if (counts.hasOwnProperty(roleKey)) {
            counts[roleKey] += 1;
        }
    });

    // Formatear los datos 
    return Object.keys(counts).map(key => ({
        role: roleMap[key].name,
        count: counts[key],
        color: roleMap[key].color
    }));
};


const Admin = () => {
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 1. Obtener y procesar datos al cargar el componente
  useEffect(() => {
    const fetchUserStats = async () => {
        try {
            // Utilizamos la función ya existente para obtener todos los usuarios
            const res = await getAllUsers(); 
            const stats = countUsersByRole(res.data);
            setUserStats(stats);
        } catch (error) {
            console.error("Error al obtener estadísticas de usuarios:", error);
            // Mostrar un mensaje o usar datos vacíos en caso de fallo
            setUserStats(countUsersByRole([])); 
        } finally {
            setLoading(false);
        }
    };
    fetchUserStats();
  }, []); // Se ejecuta solo una vez al montar


  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* 🔥 2. Navbar del Administrador */}
      <NavbarAdmin /> 

      {/* Main Content con padding para evitar que lo tape el Navbar fixed */}
      <main className="pt-24 px-4 sm:px-8 lg:px-12"> 
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Panel de Administración 📊
        </h1>

        {/* 🔥 3. Sección de Gráfica (Dashboard Summary) */}
        <section className="mb-12 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">
            Distribución de Usuarios por Rol
          </h2>
          {loading ? (
              <div className="flex justify-center items-center h-64">
                  <Loader2 className="animate-spin text-green-600" size={32} />
                  <p className="ml-3 text-lg text-gray-600">Cargando datos del dashboard...</p>
              </div>
          ) : (
              <>
                {/* Pasamos los datos procesados */}
                <UsersChart data={userStats} />
              </>
          )}
        </section>


      </main>
    </div>
  );
};

export default Admin;