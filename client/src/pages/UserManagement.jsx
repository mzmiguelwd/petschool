import { useState } from "react";

const UserManagement = () => {
  const [view, setView] = useState("list"); // 'list' | 'create' | 'edit'
  const [users, setUsers] = useState([
    { id: 1, name: "Ana Torres", email: "ana@colegiocanino.com", role: "Administrador" },
    { id: 2, name: "Carlos López", email: "carlos@colegiocanino.com", role: "Asesor de ventas" },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Administrador",
    password: "",
  });

  const [filterRole, setFilterRole] = useState("");
  const [filterName, setFilterName] = useState("");

  // ---- CRUD ----
  const handleCreate = (e) => {
    e.preventDefault();
    const newUser = { ...form, id: Date.now() };
    setUsers([...users, newUser]);
    alert("Usuario creado correctamente ✅");
    resetForm();
    setView("list");
  };

  const handleEdit = (user) => {
    setForm(user);
    setView("edit");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUsers(users.map((u) => (u.id === form.id ? form : u)));
    alert("Usuario actualizado ✅");
    resetForm();
    setView("list");
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      setUsers(users.filter((u) => u.id !== id));
      alert("Usuario eliminado 🗑️");
    }
  };

  const resetForm = () =>
    setForm({ name: "", email: "", role: "Administrador", password: "" });

  // ---- FILTROS ----
  const filteredUsers = users.filter(
    (u) =>
      (filterRole ? u.role === filterRole : true) &&
      u.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Gestión de Usuarios Internos 🐾
      </h1>

      {/* Vista lista */}
      {view === "list" && (
        <div>
          {/* Botón crear */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setView("create")}
              className="py-2 px-6 rounded-lg text-sm font-bold bg-[var(--primary-button)] text-white hover:bg-[var(--primary-hover)] transition-all"
            >
              + Crear Usuario
            </button>
          </div>

          {/* Filtros */}
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
              <option value="Administrador">Administrador</option>
              <option value="Asesor de ventas">Asesor de ventas</option>
            </select>
          </div>

          {/* Tabla */}
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
                      <td className="py-2 px-4">{user.name}</td>
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

      {/* Formulario crear / editar */}
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
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            <option value="Administrador">Administrador</option>
            <option value="Asesor de ventas">Asesor de ventas</option>
          </select>

          {view === "create" && (
            <>
              <label className="block mb-2">Contraseña</label>
              <input
                type="password"
                className="border w-full px-3 py-2 mb-4 rounded"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </>
          )}

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
