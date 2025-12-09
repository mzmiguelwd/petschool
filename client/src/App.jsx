import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ScrollToTop from "./components/ScrollToTop";

import InicioPage from "./pages/landing/InicioPage";
import CursosPage from "./pages/landing/CursosPage";
import EquipoPage from "./pages/landing/EquipoPage";
import ContactoPage from "./pages/landing/ContactoPage";
import LoginPage from "./pages/landing/LoginPage";
import RegisterPage from "./pages/landing/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import MatriculasPage from "./pages/MatriculasPage";
import MatriculaFormPage from "./pages/MatriculaFormPage";
import DirectorDashboard from "./pages/DashboardDirector";
import UserManagement from "./pages/UserManagement";
import RequireAuth from "./components/RequireAuth";

// Componente de Protección
import RequireRole from "./components/RequireRole";
import DashboardDirector from "./pages/DashboardDirector";

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
          {/* Default Route: Redirects the root path ("/") to the inicio page */}
          <Route path="/" element={<Navigate to="/inicio" />} />

          {/* Public Routes */}

          {/* Landing Routes */}
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<ProfilePage />} />
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
              element={<DashboardDirector />}
            />
            {/* Las rutas de gestión de matrículas generalmente son para Director/Admin */}
            <Route path="/matriculas" element={<MatriculasPage />} />
            <Route path="/matriculas/create" element={<MatriculaFormPage />} />
            <Route path="/matriculas/:id" element={<MatriculaFormPage />} />
            <Route path="/director/asistencias" element={<AttendanceDirectorPage />} />
          </Route>

          {/* Admin/User Management Routes */}
          {/* Displays the list of all users */}
          <Route path="/users" element={<UsersPage />} />

          {/* Route for creating a new user (admin use) */}
          <Route path="/users-create" element={<UserFormPage />} />

          {/* Route for editing an existing user. The ":id" segment allows the component
              to read the specific user ID from the URL parameters. */}
          <Route path="/users/:id" element={<UserFormPage />} />
          <Route path="/matriculas" element={<MatriculasPage />} />
          <Route path="/matriculas/create" element={<MatriculaFormPage />} />
          <Route path="/matriculas/:id" element={<MatriculaFormPage />} />
          <Route path="/director/dashboard" element={<DirectorDashboard />} />
          <Route path="/manejo" element={<UserManagement />} />
        </Routes>

        {/* Global Toast Notifier: Handles all notifications (succes/error messages)
            across the application. Needs to be placed inside the BrowserRouter context. */}
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
