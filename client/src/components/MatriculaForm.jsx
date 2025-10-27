import { useState } from "react";

const MatriculaForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    nombre_canino: initialData.nombre_canino || "",
    raza: initialData.raza || "",
    edad: initialData.edad || "",
    tamano: initialData.tamano || "mediano",
    plan: initialData.plan || "1_mes",
    transporte: initialData.transporte || "sin_transporte",
    fecha_inicio: initialData.fecha_inicio || "",
    observaciones: initialData.observaciones || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {initialData.id ? "Editar" : "Nueva"} Matrícula
      </h3>

      <div className="grid gap-4 mb-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Canino:
          </label>
          <input
            type="text"
            name="nombre_canino"
            value={formData.nombre_canino}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        {/* Raza */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raza:
          </label>
          <input
            type="text"
            name="raza"
            value={formData.raza}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        {/* Edad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edad (años):
          </label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        {/* Tamaño */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamaño:
          </label>
          <select
            name="tamano"
            value={formData.tamano}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          >
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        {/* Plan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan:
          </label>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          >
            <option value="1_mes">1 Mes</option>
            <option value="3_meses">3 Meses</option>
            <option value="6_meses">6 Meses</option>
            <option value="1_anio">1 año</option>
          </select>
        </div>

        {/* Transporte */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transporte:
          </label>
          <select
            name="transporte"
            value={formData.transporte}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
          >
            <option value="sin_transporte">Sin Transporte</option>
            <option value="medio">Medio</option>
            <option value="completo">Completo</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Inicio:
          </label>
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        {/* Observaciones */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones:
          </label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
          />
        </div>
      </div>

      <button className="py-3 px-6 w-full rounded-md font-semibold bg-[var(--primary-button)] text-white hover:bg-[var(--primary-hover)] transition-all duration-200">
        {initialData.id ? "Actualizar" : "Registrar"} Matrícula
      </button>
    </form>
  );
};

export default MatriculaForm;
