import React, { useEffect, useState } from "react";
import { getDashboardDirectorData, downloadCSV } from "../api/dashboard.api";
import NavBarDirector from "../components/NavBarDirector";
import BreedChart from "../components/charts/BreedChart";
import SizeChart from "../components/charts/SizeChart";
import PlanChart from "../components/charts/PlanChart";
import TopAttendanceChart from "../components/charts/TopAttendanceChart";

const DashboardDirector = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardDirectorData().then((resp) => {
      const directorData = resp?.director ?? resp;
      setData(directorData);
    });
  }, []);

  const handleLogout = () => {
    // Aquí puedes limpiar el token y redirigir:
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!data) return <p className="text-center mt-10">Cargando dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarDirector onLogout={handleLogout} />

      <main className="p-6 space-y-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => downloadCSV("matriculas")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Descargar Matrículas CSV
          </button>
          <button
            onClick={() => downloadCSV("asistencias")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Descargar Asistencias CSV
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <BreedChart data={data.matriculas_por_raza} />
          <SizeChart data={data.matriculas_por_tamano} />
          <PlanChart data={data.ocupacion_por_plan} />
          <TopAttendanceChart data={data.top_5_asistencia} />
        </div>
      </main>
    </div>
  );
};

export default DashboardDirector;
