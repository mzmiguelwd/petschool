import React, { useState } from "react";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";
import useAuth from "../hooks/useAuth";
import NavbarCliente from "../components/NavbarCliente";

const RegistrarCaninoPage = () => {
  const apiPrivate = useUsersApiPrivate();
  const { auth } = useAuth(); // Obtener usuario logueado

  const [caninoData, setCaninoData] = useState({
    nombre: "",
    raza: "",
    edad: "",
    tamano: "mediano",
    observaciones_medicas: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaninoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // ---------------------------------------------------------------------------
      // 1️⃣ Crear el CANINO
      // ---------------------------------------------------------------------------
      const caninoResponse = await apiPrivate.post("/caninos/", {
        nombre: caninoData.nombre,
        raza: caninoData.raza,
        edad: caninoData.edad,
        tamano: caninoData.tamano,
        observaciones_medicas: caninoData.observaciones_medicas,
        cliente: auth?.user?.id, // asignación automática
      });

      const caninoId = caninoResponse.data.id;
      console.log("Canino creado:", caninoId);

      setSuccess(true);

      setCaninoData({
        nombre: "",
        raza: "",
        edad: "",
        tamano: "mediano",
        observaciones_medicas: "",
      });
    } catch (err) {
      console.error(err);
      console.log("ERROR DEL BACKEND:", err.response?.data);
      setError(err.response?.data || { general: "Error inesperado." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Aquí puedes limpiar el token y redirigir:
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // -----------------------------------------------------------
  // FORMULARIO
  // -----------------------------------------------------------

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <NavbarCliente onLogout={handleLogout} />
      <h2 className="text-2xl font-bold mb-4">Registrar Canino + Plan</h2>

      {success && (
        <p className="text-green-600 mb-4">
          ✅ ¡Canino y plan registrados exitosamente!
        </p>
      )}
      {error && (
        <p className="text-red-600 mb-4">
          Error: {error.general || JSON.stringify(error)}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* NOMBRE */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre del Canino</label>
          <input
            type="text"
            name="nombre"
            value={caninoData.nombre}
            onChange={handleChange}
            required
            className="mt-1 w-full border p-2 rounded"
          />
        </div>

        {/* RAZA */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Raza</label>
          <input
            type="text"
            name="raza"
            value={caninoData.raza}
            onChange={handleChange}
            required
            className="mt-1 w-full border p-2 rounded"
          />
        </div>

        {/* EDAD */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Edad</label>
          <input
            type="number"
            name="edad"
            value={caninoData.edad}
            onChange={handleChange}
            required
            className="mt-1 w-full border p-2 rounded"
          />
        </div>

        {/* TAMAÑO */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Tamaño</label>
          <select
            name="tamano"
            value={caninoData.tamano}
            onChange={handleChange}
            className="mt-1 w-full border p-2 rounded"
          >
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        {/* OBSERVACIONES MÉDICAS */}
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Observaciones Médicas
          </label>
          <textarea
            name="observaciones_medicas"
            value={caninoData.observaciones_medicas}
            onChange={handleChange}
            className="mt-1 w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Registrando..." : "Registrar Canino + Plan"}
        </button>
      </form>
    </div>
  );
};

export default RegistrarCaninoPage;
