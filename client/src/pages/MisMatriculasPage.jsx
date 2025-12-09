import React, { useEffect, useState, useCallback } from "react";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";
import NavbarCliente from "../components/NavbarCliente";
import { Loader2, Dog } from "lucide-react";
import { toast } from "react-hot-toast";

const MisMatriculasPage = () => {
  const apiPrivate = useUsersApiPrivate();

  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatriculas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiPrivate.get("/matriculas/");
      setMatriculas(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error al obtener matrículas:", err);
      toast.error("No se pudieron cargar tus matrículas.");
    } finally {
      setLoading(false);
    }
  }, [apiPrivate]);

  useEffect(() => {
    fetchMatriculas();
  }, [fetchMatriculas]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCliente />

      <div className="max-w-5xl mx-auto p-6 md:p-10 mt-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          📋 Mis Matrículas
        </h1>

        {loading ? (
          <div className="text-center py-10">
            <Loader2 className="animate-spin inline mr-2" size={24} />
            <p className="text-gray-600 mt-2">Cargando matrículas...</p>
          </div>
        ) : matriculas.length === 0 ? (
          <div className="text-center bg-white border rounded-xl p-10 shadow">
            <Dog size={40} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold text-gray-700">
              Aún no tienes matrículas registradas.
            </p>
            <p className="text-gray-500 text-sm">
              Matricula un canino desde la sección "Mis Caninos".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matriculas.map((matricula) => (
              <MatriculaCard key={matricula.id} matricula={matricula} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisMatriculasPage;

const MatriculaCard = ({ matricula }) => {
  const { canino, plan, transporte, fecha_inicio, fecha_fin, precio_total } =
    matricula;

  console.log(matricula);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
      {/* Nombre del canino */}
      <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
        <Dog size={20} className="mr-2 text-amber-500" />
        {canino?.nombre}
        {matricula.canino_nombre}
      </h2>

      <p className="text-sm text-gray-500 mb-4">{canino?.raza}</p>

      {/* Datos principales */}
      <div className="space-y-1 text-sm">
        <p>
          <strong>Plan:</strong> {plan}
        </p>
        <p>
          <strong>Transporte:</strong>{" "}
          {transporte ? "Sí incluye" : "No incluye"} {matricula.transporte}
        </p>
        <p>
          <strong>Inicio:</strong> {fecha_inicio}
        </p>
        <p>
          <strong>Fin:</strong> {matricula.fecha_vencimiento}
        </p>
      </div>
    </div>
  );
};
