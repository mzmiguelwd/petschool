import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          👋 Bienvenido, {auth?.user?.first_name || "Usuario"}
        </h1>
        <div className="space-y-3">
          <p>
            <strong>ID:</strong> {auth?.user?.id}
          </p>
          <p>
            <strong>Nombre:</strong> {auth?.user?.first_name}
          </p>
          <p>
            <strong>Apellido:</strong> {auth?.user?.last_name}
          </p>
          <p>
            <strong>Correo:</strong> {auth?.user?.email}
          </p>
          <Link
            to="/matriculas"
            className="inline-block transform transition-transform duration-300 font-medium text-base sm:text-md hover:scale-110 hover:text-[var(--primary-button)] bg-amber-200"
          >
            Registrar Canino
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
