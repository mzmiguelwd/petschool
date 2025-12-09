import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";
import NavbarCliente from "../components/NavbarCliente";

const RegistrarMatriculaPage = () => {
  const apiPrivate = useUsersApiPrivate();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const caninoId = params.get("canino");

  const [formData, setFormData] = useState({
    plan: "1_mes",
    transporte: "sin_transporte",
    fecha_inicio: "",
    observaciones: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiPrivate.post("/matriculas/", {
        canino: Number(caninoId),
        plan: formData.plan,
        transporte: formData.transporte,
        fecha_inicio: formData.fecha_inicio,
        observaciones: formData.observaciones,
      });

      navigate("/cliente/matriculas"); // Redirección final
    } catch (err) {
      console.log(err);
      setError(err.response?.data || { general: "Error inesperado" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <NavbarCliente />

      <h2 className="text-2xl font-bold mb-4">Registrar Matrícula</h2>

      {error && <p className="text-red-600">{JSON.stringify(error)}</p>}

      <form onSubmit={handleSubmit}>
        {/* PLAN */}
        <label>Plan</label>
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        >
          <option value="1_mes">1 mes</option>
          <option value="1_bimestre">1 bimestre</option>
          <option value="1_trimestre">1 trimestre</option>
          <option value="6_meses">6 meses</option>
          <option value="1_anio">1 año</option>
        </select>

        {/* TRANSPORTE */}
        <label>Transporte</label>
        <select
          name="transporte"
          value={formData.transporte}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        >
          <option value="sin_transporte">Sin transporte</option>
          <option value="medio">Medio (mañana/tarde)</option>
          <option value="completo">Completo</option>
        </select>

        {/* FECHA INICIO */}
        <label>Fecha inicio</label>
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />

        {/* OBSERVACIONES */}
        <label>Observaciones</label>
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Guardando..." : "Registrar Matrícula"}
        </button>
      </form>
    </div>
  );
};

export default RegistrarMatriculaPage;
