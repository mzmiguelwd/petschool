import React, { useState, useEffect } from "react";
import {
  getAllMatriculas,
  createMatricula,
  updateMatricula,
  deleteMatricula,
} from "../api/matriculas";
import MatriculaList from "../components/MatriculaList";
import MatriculaForm from "../components/MatriculaForm";

const MatriculasPage = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMatricula, setEditingMatricula] = useState(null);

  useEffect(() => {
    loadMatriculas();
  }, []);

  const loadMatriculas = async () => {
    try {
      const response = await getAllMatriculas();
      setMatriculas(response.data);
    } catch (error) {
      console.error("Error cargando matrículas:", error);
    }
  };

  const handleCreateMatricula = async (formData) => {
    try {
      await createMatricula(formData);
      setShowForm(false);
      loadMatriculas();
      alert("Matrícula creada exitosamente!");
    } catch (error) {
      console.error("Error creando matrícula:", error);
      alert("Error al crear matrícula");
    }
  };

  const handleEditMatricula = (matricula) => {
    setEditingMatricula(matricula);
    setShowForm(true);
  };

  const handleUpdateMatricula = async (formData) => {
    try {
      await updateMatricula(editingMatricula.id, formData);
      setShowForm(false);
      setEditingMatricula(null);
      loadMatriculas();
      alert("Matrícula actualizada exitosamente!");
    } catch (error) {
      console.error("Error actualizando matrícula:", error);
      alert("Error al actualizar matrícula");
    }
  };

  const handleDeleteMatricula = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta matrícula?")) {
      try {
        await deleteMatricula(id);
        loadMatriculas();
        alert("Matrícula eliminada exitosamente!");
      } catch (error) {
        console.error("Error eliminando matrícula:", error);
        alert("Error al eliminar matrícula");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Matrículas
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="py-2 px-6 rounded-[6px] text-sm font-bold bg-[var(--primary-button)] text-white cursor-pointer transition-all duration-300 hover:bg-[var(--primary-hover)]"
          >
            + Nueva Matrícula
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <MatriculaForm
                  onSubmit={
                    editingMatricula
                      ? handleUpdateMatricula
                      : handleCreateMatricula
                  }
                  initialData={editingMatricula || {}}
                />
              </div>
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingMatricula(null);
                  }}
                  className="w-full py-2 px-4 rounded-[6px] text-sm font-medium text-gray-600 border border-gray-300 cursor-pointer transition-all duration-300 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Matrículas List */}
        <MatriculaList
          matriculas={matriculas}
          onEdit={handleEditMatricula}
          onDelete={handleDeleteMatricula}
        />
      </div>
    </div>
  );
};

export default MatriculasPage;
