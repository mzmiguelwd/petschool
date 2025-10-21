import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  // Hook to enable programmatic navigation.
  const navigate = useNavigate();

  return (
    <div
      className="border border-gray-300 rounded-lg p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:border-orange-500 hover:scale-102"
      onClick={() => {
        // Navigates to the user detail route on click.
        navigate(`/users/${user.id}`);
      }}
    >
      {/* --- User Email (Title) */}
      <h1 className="font-bold">{user.email}</h1>

      {/* --- User Details List */}
      <ul className="text-slate-400">
        <li>Nombre: {user.name}</li>
        <li>Apellido: {user.last_name}</li>
        <li>Teléfono: {user.phone}</li>
        <li>Creado: {user.created_at}</li>
        <li>Actualizado: {user.updated_at}</li>
      </ul>
    </div>
  );
};

export default UserCard;
