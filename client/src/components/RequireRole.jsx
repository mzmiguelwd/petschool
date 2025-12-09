import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireRole = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const userRole = auth?.user?.role;

  return allowedRoles.includes(userRole) ? (
    <Outlet /> // Permite el acceso al componente hijo (la ruta)
  ) : auth?.accessToken ? ( // Si tiene token (está logueado) pero el rol no coincide
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ); // Si no tiene token, al login
};

export default RequireRole;
