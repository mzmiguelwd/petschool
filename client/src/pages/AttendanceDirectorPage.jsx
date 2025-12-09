import React, { useState, useEffect, useMemo } from "react";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";
import NavbarDirector from "../components/NavbarDirector"; // Asumo que tienes uno, o usa el genérico
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  XCircle,
  Save,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AttendanceDirectorPage = () => {
  const apiPrivate = useUsersApiPrivate();

  const handleLogout = () => {
    // Aquí puedes limpiar el token y redirigir:
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  
  // Estado
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  // Formato de fecha para la API (YYYY-MM-DD)
  const dateStr = format(selectedDate, "yyyy-MM-dd");

  // 1. Cargar Datos
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await apiPrivate.get(
          `/director/asistencia/?date=${dateStr}`
        );
        setStudents(response.data.alumnos);
      } catch (error) {
        console.error("Error cargando asistencia", error);
        toast.error("Error al cargar la lista");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [dateStr, apiPrivate]);

  // 2. Manejadores de Interacción
  const handleToggleAttendance = (matriculaId) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.matricula_id === matriculaId
          ? { ...student, presente: !student.presente, registrado: true }
          : student
      )
    );
  };

  const handleMarkAll = (status) => {
    setStudents((prev) =>
      prev.map((s) => ({ ...s, presente: status, registrado: true }))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    // Preparamos el payload para el backend
    const payload = students.map((s) => ({
      matricula_id: s.matricula_id,
      fecha: dateStr,
      presente: s.presente,
    }));

    try {
      await apiPrivate.post("/director/asistencia/", payload);
      toast.success("✅ Asistencia guardada correctamente");
    } catch (error) {
      toast.error("❌ Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  // 3. Filtrado y Estadísticas
  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.nombre_canino.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const stats = useMemo(() => {
    const total = students.length;
    const present = students.filter((s) => s.presente).length;
    return { total, present, absent: total - present };
  }, [students]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarDirector onLogout={handleLogout}/> {/* Tu Navbar de Director */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6">
        {/* --- HEADER: Fecha y Estadísticas --- */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Selector de Fecha */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                className="p-2 hover:bg-white rounded-full transition shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="px-6 flex items-center font-semibold text-gray-700">
                <Calendar size={18} className="mr-2 text-blue-600" />
                <span className="capitalize">
                  {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                </span>
              </div>
              <button
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                className="p-2 hover:bg-white rounded-full transition shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Stats Pills */}
            <div className="flex gap-3 text-sm font-medium">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 flex items-center">
                <Users size={14} className="mr-1" /> Total: {stats.total}
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 flex items-center">
                <CheckCircle2 size={14} className="mr-1" /> Presentes:{" "}
                {stats.present}
              </span>
              <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-100 flex items-center">
                <XCircle size={14} className="mr-1" /> Ausentes: {stats.absent}
              </span>
            </div>
          </div>
        </div>

        {/* --- BARRA DE HERRAMIENTAS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Buscador */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar canino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Botones de Acción Rápida */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => handleMarkAll(true)}
              className="flex-1 md:flex-none px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Todos Presentes
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50"
            >
              {saving ? (
                "Guardando..."
              ) : (
                <>
                  <Save size={18} /> Guardar Lista
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- LISTA DE ALUMNOS (GRID/CARDS) --- */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Cargando lista...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.matricula_id}
                onClick={() => handleToggleAttendance(student.matricula_id)}
                className={`
                  relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 group select-none
                  ${
                    student.presente
                      ? "bg-white border-green-500 shadow-md"
                      : "bg-gray-50 border-transparent hover:border-gray-300"
                  }
                `}
              >
                {/* Avatar / Icono */}
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                  ${
                    student.presente
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
                >
                  {student.nombre_canino.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3
                    className={`font-bold text-lg ${
                      student.presente ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {student.nombre_canino}
                  </h3>
                  <p className="text-sm text-gray-400">{student.raza}</p>
                </div>

                {/* Status Icon */}
                <div className="text-2xl transition-transform transform group-hover:scale-110">
                  {student.presente ? (
                    <CheckCircle2 className="text-green-500 w-8 h-8 fill-green-50" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-gray-400" />
                  )}
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-10">
                No se encontraron caninos con ese nombre.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AttendanceDirectorPage;
