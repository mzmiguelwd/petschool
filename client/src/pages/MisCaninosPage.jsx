import React, { useState, useEffect, useCallback } from "react";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";
import useAuth from "../hooks/useAuth";
import NavbarCliente from "../components/NavBarCliente";
import { PlusCircle, Dog, Loader2, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const MisCaninosPage = () => {
  const apiPrivate = useUsersApiPrivate();
  const { auth } = useAuth(); // Obtener usuario logueado

  const [caninosList, setCaninosList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("list"); // 'list' o 'register'

  // Función para obtener la lista de caninos del usuario
  const fetchCaninos = useCallback(async () => {
    setLoadingList(true);
    try {
      // Endpoint: /api/v1/caninos/
      // El backend (CaninoViewSet) ya filtra automáticamente por el usuario logueado
      const response = await apiPrivate.get("/caninos/");
      setCaninosList(response.data);
    } catch (err) {
      console.error("Error al cargar la lista de caninos:", err);
      toast.error("No se pudieron cargar tus caninos.", {
        style: { background: "#101010", color: "#fff" },
      });
    } finally {
      setLoadingList(false);
    }
  }, [apiPrivate]);

  // Ejecutar la carga inicial al montar el componente
  useEffect(() => {
    fetchCaninos();
  }, [fetchCaninos]);

  // Función que se llama después de crear un canino
  const onCaninoCreated = () => {
    fetchCaninos(); // Refresca la lista
    setActiveTab("list"); // Vuelve a la lista
    toast.success("¡Canino registrado con éxito!", {
      style: { background: "#101010", color: "#fff" },
    });
  };

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
    <div className="min-h-screen bg-gray-50">
      <NavbarCliente onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto p-6 md:p-10 mt-15">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          🐶 Mis Caninos
        </h1>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-gray-200 mb-6">
          <TabButton
            isActive={activeTab === "list"}
            onClick={() => setActiveTab("list")}
            label={`Mis Mascotas (${caninosList.length})`}
            icon={Dog}
          />
          <TabButton
            isActive={activeTab === "register"}
            onClick={() => setActiveTab("register")}
            label="Registrar Nuevo"
            icon={PlusCircle}
          />
        </div>

        {/* Contenido de la Pestaña */}
        {activeTab === "list" && (
          <CaninosList list={caninosList} loading={loadingList} />
        )}

        {activeTab === "register" && (
          <CaninoRegisterForm
            apiPrivate={apiPrivate}
            onSuccess={onCaninoCreated}
          />
        )}
      </div>
    </div>
  );
};

export default MisCaninosPage;

// =========================================================================
// 2. COMPONENTES AUXILIARES
// =========================================================================

// Componente para los botones de las pestañas
const TabButton = ({ isActive, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    <Icon size={18} className="mr-2" />
    {label}
  </button>
);

// Componente para mostrar la lista de caninos
const CaninosList = ({ list, loading }) => {
  if (loading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="animate-spin inline mr-2 text-blue-500" size={24} />
        <p className="text-gray-600">Cargando tus caninos...</p>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="text-center p-8 bg-white border border-dashed rounded-lg">
        <Dog size={32} className="mx-auto mb-3 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">
          Aún no tienes caninos registrados.
        </p>
        <p className="text-sm text-gray-500">
          Usa la pestaña "Registrar Nuevo" para empezar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {list.map((canino) => (
        <div
          key={canino.id}
          className="bg-white p-5 shadow-lg rounded-xl border border-gray-100 transition duration-300 hover:shadow-xl"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Dog size={20} className="mr-2 text-amber-500" />
              {canino.nombre}
            </h3>
            <div className="space-x-2">
              <button
                // Añadir lógica de edición
                className="text-gray-400 hover:text-blue-500 p-1 rounded transition"
              >
                <Edit size={16} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-3">{canino.raza}</p>

          <div className="space-y-1 text-sm">
            <p>
              <strong>Edad:</strong> {canino.edad} años
            </p>
            <p className="capitalize">
              <strong>Tamaño:</strong> {canino.tamano}
            </p>
            {canino.observaciones_medicas && (
              <p>
                <strong>Notas Médicas:</strong>{" "}
                <span className="text-red-500">
                  {canino.observaciones_medicas}
                </span>
              </p>
            )}
          </div>
          {canino.matricula ? (
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full mt-3">
              ✔ Ya matriculado
            </span>
          ) : (
            <Link to={`/cliente/registrar-matricula?canino=${canino.id}`}>
              <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">
                Matricular
              </button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

// Componente para el formulario de registro (refactorizado de tu código)
const CaninoRegisterForm = ({ apiPrivate, onSuccess }) => {
  const [caninoData, setCaninoData] = useState({
    nombre: "",
    raza: "",
    edad: "",
    tamano: "mediano",
    observaciones_medicas: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaninoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // El cliente se asigna automáticamente en el backend (perform_create)
      await apiPrivate.post("/caninos/", caninoData);

      // Llamar al callback para actualizar la lista principal
      onSuccess();

      // Limpiar formulario
      setCaninoData({
        nombre: "",
        raza: "",
        edad: "",
        tamano: "mediano",
        observaciones_medicas: "",
      });
    } catch (err) {
      console.error(err);
      const errorData = err.response?.data || {
        detail: "Error desconocido al registrar.",
      };
      setError(errorData);
      toast.error(errorData.detail || "Error al registrar canino.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-xl rounded-2xl max-w-lg mx-auto border">
      <h3 className="text-xl font-semibold mb-6">
        Completa los Datos del Canino
      </h3>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4">
          <p className="font-bold">Error de Registro:</p>
          {/* Mostrar errores específicos de campo si existen */}
          {Object.keys(error).map((key) => (
            <p key={key} className="text-sm">
              {key}: {error[key]}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (Tus campos de formulario: Nombre, Raza, Edad, Tamaño, Observaciones) ... */}
        <InputField
          label="Nombre del Canino"
          type="text"
          name="nombre"
          value={caninoData.nombre}
          onChange={handleChange}
          required
        />
        <InputField
          label="Raza"
          type="text"
          name="raza"
          value={caninoData.raza}
          onChange={handleChange}
          required
        />
        <InputField
          label="Edad (años)"
          type="number"
          name="edad"
          value={caninoData.edad}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col">
          <label className="text-sm font-medium">Tamaño</label>
          <select
            name="tamano"
            value={caninoData.tamano}
            onChange={handleChange}
            className="mt-1 border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Observaciones Médicas</label>
          <textarea
            name="observaciones_medicas"
            value={caninoData.observaciones_medicas}
            onChange={handleChange}
            className="mt-1 border p-2 rounded resize-y focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin inline mr-2" size={16} />
              Registrando...
            </>
          ) : (
            "Registrar Canino"
          )}
        </button>
      </form>
    </div>
  );
};

// Componente auxiliar para inputs genéricos
const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 border p-2 rounded focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
);
