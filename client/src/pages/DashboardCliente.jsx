import React, { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboard.api";
import NavbarCliente from "../components/NavBarCliente";
import PetsChart from "../components/charts/PetsChart";
import AttendanceChart from "../components/charts/AttendanceChart";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";

const DashboardCliente = () => {
  const usersApiPrivate = useUsersApiPrivate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getDashboardData(usersApiPrivate);
        const clientData = resp?.client ?? resp;
        setData(clientData);
      } catch (error) {
        console.error("Error al cargar el dashboard:", error);
        // Manejar errores de autenticación (ej: token no renovado, 401) // En este punto, el interceptor ya debió intentar renovar el token.
      }
    };

    fetchData();
    // El useEffect ahora depende de usersApiPrivate, que se recrea si 'auth' o 'refresh' cambia
  }, [usersApiPrivate]);

  const handleLogout = () => {
    // Aquí puedes limpiar el token y redirigir:
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!data) {
    return (
      <div className="text-center mt-20">Cargando datos del dashboard...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarCliente onLogout={handleLogout} />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible">
        <div className="md:col-span-2 w-full mt-6 relative z-0">
          <PetsChart data={data.caninos_matriculados} />
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AttendanceChart data={data.asistencias} />
      </div>
    </div>
  );
};

export default DashboardCliente;
