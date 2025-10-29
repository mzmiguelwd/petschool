import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import CursosPage from "./pages/CursosPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import AutoRegisterFormPage from "./pages/AutoRegisterFormPage";
import MatriculasPage from "./pages/MatriculasPage";
import MatriculaFormPage from "./pages/MatriculaFormPage";
const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <BrowserRouter>
        <Routes>
          {/* Default Route: Redirects the root path ("/") to the landing page */}
          <Route path="/" element={<Navigate to="/landing" />} />

          {/* Public Routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auto-register" element={<AutoRegisterFormPage />} />

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
        </Routes>

        {/* Global Toast Notifier: Handles all notifications (succes/error messages)
            across the application. Needs to be placed inside the BrowserRouter context. */}
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
