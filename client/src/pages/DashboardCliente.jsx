import React, { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboard.api";
import NavBarCliente from "../components/NavBarCliente";
import PetsChart from "../components/charts/PetsChart";
import AttendanceChart from "../components/charts/AttendanceChart";

const DashboardCliente = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getDashboardData().then((resp) => {
      const clienteData = resp?.cliente ?? resp;
      setData(clienteData);
    });
  }, []);
  //const token = localStorage.getItem("access"); // Asegúrate que guardas el token al iniciar sesión

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardClienteData(token);
        setData(result);
      } catch (error) {
        console.error("Error al cargar el dashboard del cliente:", error);
      }
    };
    fetchData();
  }, [token]);*/

  const handleLogout = () => {
    // Aquí puedes limpiar el token y redirigir:
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!data) {
    return <div className="text-center mt-20">Cargando datos del dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarCliente onLogout={handleLogout} />
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
