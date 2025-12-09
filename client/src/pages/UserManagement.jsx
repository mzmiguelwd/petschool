import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users.api"; // <-- Ajusta la ruta según tu proyecto
import NavbarAdminMini from "../components/NavbarAdminMini";

const UserManagement = () => {
  const [view, setView] = useState("list");
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    id: null,
    first_name: "",
    email: "",
    role: "Administrador",
  });

  const [filterRole, setFilterRole] = useState("");
  const [filterName, setFilterName] = useState("");

  // -----------------------------------------------------
  // 🔥 1. Cargar usuarios al iniciar
  // -----------------------------------------------------
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
  try {
    const res = await getAllUsers();
    console.log("Usuarios cargados:", res.data); // <-- agrega esto
    setUsers(res.data);
  } catch (error) {
    console.error("Error cargando usuarios", error);
    alert("❌ Error cargando usuarios");
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


  // -----------------------------------------------------
  // 🔥 3. Pasar datos al formulario para editar
  // -----------------------------------------------------
  const handleEdit = (user) => {
    setForm({
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      role: user.role,
    });
    setView("edit");
  };

  // -----------------------------------------------------
  // 🔥 4. Actualizar usuario (PUT API)
  // -----------------------------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(form.id, form);
      alert("Usuario actualizado correctamente ✅");
      resetForm();
      setView("list");
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("❌ Error al actualizar usuario");
    }
  };

  // -----------------------------------------------------
  // 🔥 5. Eliminar usuario (DELETE API)
  // -----------------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await deleteUser(id);
      alert("Usuario eliminado 🗑️");
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("❌ Error al eliminar usuario");
    }
  };

  const resetForm = () =>
    setForm({
      id: null,
      first_name: "",
      email: "",
      role: "Administrador",
    });

  const filteredUsers = users.filter(
    (u) =>
      (filterRole ? u.role === filterRole : true) &&
      u.first_name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <NavbarAdminMini onLogout={handleLogout} />

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Gestión de Usuarios Internos 🐾
      </h1>

      {view === "list" && (
        <div>
          

          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="border px-3 py-2 rounded w-60"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="cliente">Cliente</option>
              <option value="director">Director</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Nombre</th>
                  <th className="py-2 px-4 text-left">Correo</th>
                  <th className="py-2 px-4 text-left">Rol</th>
                  <th className="py-2 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{user.first_name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.role}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No hay usuarios con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(view === "create" || view === "edit") && (
        <form
          onSubmit={view === "create" ? handleCreate : handleUpdate}
          className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
            {view === "create" ? "Crear Usuario" : "Editar Usuario"}
          </h2>

          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            className="border w-full px-3 py-2 mb-4 rounded"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            required
          />

          <label className="block mb-2">Correo</label>
          <input
            type="email"
            className="border w-full px-3 py-2 mb-4 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label className="block mb-2">Rol</label>
          <select
            className="border w-full px-3 py-2 mb-4 rounded"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="director">Director</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setView("list");
                resetForm();
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {view === "create" ? "Crear" : "Actualizar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserManagement;