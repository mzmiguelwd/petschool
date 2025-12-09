import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ScrollToTop from "./components/ScrollToTop";

// Rutas de Aterrizaje
import InicioPage from "./pages/landing/InicioPage";
import CursosPage from "./pages/landing/CursosPage";
import EquipoPage from "./pages/landing/EquipoPage";
import ContactoPage from "./pages/landing/ContactoPage";
import LoginPage from "./pages/landing/LoginPage";
import RegisterPage from "./pages/landing/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Rutas Generales de Usuario
import ProfilePage from "./pages/ProfilePage";
import MisCaninosPage from "./pages/MisCaninosPage";
import RegisterCanino from "./pages/RegisterCanino";

// Rutas de Dashboards/Administración
import ClienteDashboard from "./pages/DashboardCliente";
// import DirectorDashboard from "./pages/DashboardDirector";
import AttendanceDirectorPage from "./pages/AttendanceDirectorPage";
// import AdminDashboard from "./pages/DashboardAdmin"; // Necesitas crear esta si no existe
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import MatriculasPage from "./pages/MatriculasPage";
import MatriculaFormPage from "./pages/MatriculaFormPage";
import UserManagement from "./pages/UserManagement";

// Componente de Protección
import RequireRole from "./components/RequireRole";

// --- Definición de Roles (Coincide con Django: cliente, director, admin) ---
const DJANGO_ROLES = {
  CLIENTE: "cliente",
  DIRECTOR: "director",
  ADMIN: "admin",
};

const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* ------------------------------------------------------------- */}
          {/* I. RUTAS PÚBLICAS / LANDING */}
          {/* ------------------------------------------------------------- */}
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* ------------------------------------------------------------- */}
          {/* II. RUTAS PROTEGIDAS POR ROL */}
          {/* ------------------------------------------------------------- */}

          {/* 1. Rutas para CLIENTES (Rol: 'cliente') */}
          <Route
            element={<RequireRole allowedRoles={[DJANGO_ROLES.CLIENTE]} />}
          >
            <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
            <Route path="/cliente/profile" element={<ProfilePage />} />
            <Route path="/cliente/caninos" element={<MisCaninosPage />} />
            <Route
              path="/cliente/registrar-canino"
              element={<RegisterCanino />}
            />
            <Route
              path="/cliente/registrar-matricula"
              element={<RegisterCanino />}
            />
            <Route path="/caninos" element={<RegisterCanino />} />
          </Route>

          {/* 2. Rutas para DIRECTORES y ADMINISTRADORES (Roles: 'director', 'admin') */}
          <Route
            element={
              <RequireRole
                allowedRoles={[DJANGO_ROLES.DIRECTOR, DJANGO_ROLES.ADMIN]}
              />
            }
          >
            <Route
              path="/director/dashboard"
              element={<AttendanceDirectorPage />}
            />
            {/* Las rutas de gestión de matrículas generalmente son para Director/Admin */}
            <Route path="/matriculas" element={<MatriculasPage />} />
            <Route path="/matriculas/create" element={<MatriculaFormPage />} />
            <Route path="/matriculas/:id" element={<MatriculaFormPage />} />
          </Route>

          {/* 3. Rutas EXCLUSIVAS para ADMINISTRADORES (Rol: 'admin') */}
          {/* Estas rutas manejan la gestión de usuarios, el nivel más alto de control. */}
          <Route element={<RequireRole allowedRoles={[DJANGO_ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<UserManagement />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users-create" element={<UserFormPage />} />
            <Route path="/users/:id" element={<UserFormPage />} />
          </Route>

          {/* ------------------------------------------------------------- */}
          {/* III. CATCH ALL (404 Page) */}
          {/* ------------------------------------------------------------- */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
