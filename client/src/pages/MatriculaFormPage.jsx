import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getMatricula,
  createMatricula,
  updateMatricula,
} from "../api/matriculas";
import MatriculaForm from "../components/MatriculaForm";

const MatriculaFormPage = () => {
  const { id } = useParams(); // si existe, es edición
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [matricula, setMatricula] = useState(null);

  useEffect(() => {
    if (id) {
      loadMatricula();
    }
  }, [id]);

  const loadMatricula = async () => {
    setLoading(true);
    try {
      const res = await getMatricula(id);
      setMatricula(res.data);
    } catch (error) {
      toast.error("Error al cargar matrícula");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await updateMatricula(id, formData);
        toast.success("Matrícula actualizada correctamente");
      } else {
        await createMatricula(formData);
        toast.success("Matrícula creada correctamente");
      }
      navigate("/matriculas");
    } catch (error) {
      toast.error("Error al guardar matrícula");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <MatriculaForm onSubmit={handleSubmit} initialData={matricula || {}} />
      </div>
    </div>
  );
};

export default MatriculaFormPage;
