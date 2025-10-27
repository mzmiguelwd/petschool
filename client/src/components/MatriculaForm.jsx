import { useState } from "react";

const MatriculaForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    nombre_perro: initialData.nombre_perro || "",
    raza: initialData.raza || "",
    edad: initialData.edad || "",
    servicio: initialData.servicio || "",
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Perro:
          </label>
          <input
            type="text"
            name="nombre_perro"
            value={formData.nombre_perro}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raza:
          </label>
          <input
            type="text"
            name="raza"
            value={formData.raza}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edad (años):
          </label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servicio:
          </label>
          <select
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          >
            <option value="">Seleccionar servicio</option>
            <option value="obediencia_basica">Obediencia Básica</option>
            <option value="agilidad_canina">Agilidad Canina</option>
            <option value="socializacion">Socialización</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Inicio:
          </label>
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones:
          </label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-button)]"
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
