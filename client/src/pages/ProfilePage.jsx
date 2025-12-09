import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import NavbarCliente from "../components/NavBarCliente"; // Asumo que maneja navegación y logout
import { Link } from "react-router-dom";
import { usersApiPrivate } from "../api/users.api"; // Asegúrate de tener esta instancia segura
import useUsersApiPrivate from "../hooks/useUsersApiPrivate"; // Hook para llamadas protegidas
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { auth, setAuth } = useAuth(); // Necesitamos setAuth para actualizar el contexto
  const apiPrivate = useUsersApiPrivate();

  console.log("Objeto de autenticación (auth) completo:", auth);

  // Inicializamos el estado editable con los datos actuales del contexto
  const [formData, setFormData] = useState({
    first_name: auth?.user?.first_name || "",
    last_name: auth?.user?.last_name || "",
    phone: auth?.user?.phone || "",
    address: auth?.user?.address || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Campos que NO deberían ser editables
  const { id, email, identification, role, created_at } = auth?.user || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // 1. Llamada PATCH al endpoint /users/me/
      // Enviamos solo los campos editables
      const response = await apiPrivate.patch(`users/me/`, formData);

      // 2. Actualizar el contexto global con los nuevos datos
      const updatedUser = response.data;
      setAuth((prev) => ({
        ...prev,
        user: updatedUser, // Reemplaza el objeto de usuario con la versión actualizada
      }));

      toast.success("Perfil actualizado correctamente.", {
        style: { background: "#101010", color: "#fff" },
      });
      setIsEditing(false); // Desactiva la edición
    } catch (error) {
      console.error(
        "Error al actualizar perfil:",
        error.response?.data || error
      );
      toast.error("Error al actualizar el perfil.", {
        style: { background: "#101010", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión (simplificada)
  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpia el contexto persistido
    window.location.href = "/login"; // Redirige a la página de inicio de sesión
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarCliente onLogout={handleLogout} />

      <main className="flex justify-center p-6 md:p-10">
        <div className="bg-white shadow-xl mt-10 rounded-2xl p-8 w-full max-w-lg">
          {/* ------------------------------------------------------------- */}
          {/* SECCIÓN DE DATOS DE SÓLO LECTURA */}
          {/* ------------------------------------------------------------- */}
          <section className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Información de Cuenta
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong className="font-medium text-gray-800 w-32 inline-block">
                  Correo:
                </strong>
                {email}
              </p>
              <p>
                <strong className="font-medium text-gray-800 w-32 inline-block">
                  Identificación:
                </strong>
                {identification}
              </p>
              <p>
                <strong className="font-medium text-gray-800 w-32 inline-block">
                  Rol:
                </strong>
                <span className="capitalize">{role}</span>
              </p>
            </div>
          </section>

          {/* ------------------------------------------------------------- */}
          {/* SECCIÓN DE DATOS EDITABLES */}
          {/* ------------------------------------------------------------- */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700 flex justify-between items-center">
              Datos Personales
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-medium text-blue-500 hover:text-blue-700 transition duration-150 cursor-pointer"
              >
                {isEditing ? "Cancelar" : "Editar"}
              </button>
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* 1. Nombre */}
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={`mt-1 p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* 2. Apellido */}
              <div className="flex flex-col">
                <label
                  htmlFor="last_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={`mt-1 p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* 3. Teléfono */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={`mt-1 p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* 4. Dirección */}
              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className={`mt-1 p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Botón de Guardar (Visible solo en modo edición) */}
              {isEditing && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-[var(--primary-button)] text-white p-3 rounded-md font-semibold hover:bg-[var(--primary-hover)] transition duration-200 disabled:bg-gray-400 cursor-pointer"
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              )}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
