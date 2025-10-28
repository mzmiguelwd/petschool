import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllMatriculas, deleteMatricula } from "../api/matriculas";
import MatriculaList from "../components/MatriculaList";

const MatriculasPage = () => {
  const [matriculas, setMatriculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMatriculas();
  }, []);

  const loadMatriculas = async () => {
    try {
      const res = await getAllMatriculas();
      setMatriculas(res.data);
    } catch (error) {
      toast.error("Error cargando las matrículas");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro deseas eliminar esta matrícula?")) {
      try {
        await deleteMatricula(id);
        toast.success("Matrícula eliminada correctamente");
        loadMatriculas();
      } catch (error) {
        toast.error("Error al eliminar la matrícula");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Matrículas
          </h1>
          <button
            onClick={() => navigate("/matriculas/create")}
            className="py-2 px-6 rounded-lg text-sm font-bold bg-[var(--primary-button)] text-white hover:bg-[var(--primary-hover)] transition-all"
          >
            + Nueva Matrícula
          </button>
        </div>

        <MatriculaList
          matriculas={matriculas}
          onEdit={(m) => navigate(`/matriculas/${m.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default MatriculasPage;
