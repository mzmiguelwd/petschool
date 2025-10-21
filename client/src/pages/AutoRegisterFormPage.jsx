import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createUser, deleteUser, updateUser, getUser } from "../api/users.api";

import NavbarAdmin from "../components/NavbarAdmin";

const AutoRegisterFormPage = () => {
  // Initialize React Hook Form for state and validation.
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Hook for programmatic navigation.
  const navigate = useNavigate();

  // Hook to get URL parameters (like 'id').
  const params = useParams();

  // Handles form submission for both creation and update.
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      // --- Update Mode ---
      await updateUser(params.id, data);
      toast.success("Usuario actualizado correctamente.", {
        style: { background: "#101010", color: "#fff" },
      });
    } else {
      // --- Create Mode ---
      try {
        await createUser(data);
        toast.success("Usuario creado correctamente.", {
          style: { background: "#101010", color: "#fff" },
        });
      } catch (error) {
        // Logging detailed error information.
        console.log(error.response?.data);
        console.error(error);
        toast.error(
          "Error creando el usuario. Revisa la consola para obtener detalles.",
          {
            style: { background: "#101010", color: "#fff" },
          }
        );
      }
    }
    // Navigate back to the user list after successful operation.
    navigate("/users");
  });

  // Hook to load user data when in Edit mode.
  // Runs whenever params.id changes.
  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        // Fetch user data using the ID from params
        const {
          data: { name, last_name, email, phone },
        } = await getUser(params.id);

        // Set form field values for editing
        setValue("name", name);
        setValue("last_name", last_name);
        setValue("email", email);
        setValue("phone", phone);
      } else {
        // Reset the form fields to empty values if creating a new user
        reset({ name: "", last_name: "", email: "", phone: "" });
      }
    }
    loadUser();
  }, [params.id, reset, setValue]); // Dependencies for re-running the effect

  // Handler for the Delete button click (in Edit mode only)
  const handleDelete = async () => {
    const userWantsToDelete = true;

    if (userWantsToDelete) {
      try {
        await deleteUser(params.id);
        toast.success("Usuario eliminado correctamente.", {
          style: { background: "#101010", color: "#fff" },
        });
        navigate("/users");
      } catch (error) {
        console.error("Error eliminando el usuario:", error);
        toast.error(
          "Error eliminando el usuario. Revisa la consola para obtener detalles.",
          {
            style: { background: "#101010", color: "#fff" },
          }
        );
      }
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="max-w-xl mx-auto mt-24">
        {/* --- Form --- */}
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md"
        >
          {/* --- Name --- */}
          {errors.name && (
            <span className="text-red-500 text-sm font-medium">
              Se requiere un nombre para continuar!
            </span>
          )}
          <input
            type="text"
            placeholder="Nombre..."
            {...register("name", { required: true })}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* --- Last Name --- */}
          {errors.last_name && (
            <span className="text-red-500 text-sm font-medium">
              Se requiere un apellido para continuar!
            </span>
          )}
          <input
            type="text"
            placeholder="Apellido..."
            {...register("last_name", { required: true })}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* --- Email --- */}
          {errors.email && (
            <span className="text-red-500 text-sm font-medium">
              Se requiere un correo para continuar!
            </span>
          )}
          <input
            type="text"
            placeholder="Correo Electrónico..."
            {...register("email", { required: true })}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* --- Phone --- */}
          {errors.phone && (
            <span className="text-red-500 text-sm font-medium">
              Se requiere un teléfono para continuar!
            </span>
          )}
          <input
            type="text"
            placeholder="Teléfono..."
            {...register("phone", { required: true })}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* --- Save Button --- */}
          <button className="items-center py-2 px-4 rounded-3xl text-[white] bg-[#2E7D32] cursor-pointer transition-all duration-300 hover:bg-[#FFD54F] hover:text-[#2E7D32] active:scale-80">
            Guardar
          </button>
        </form>

        {/* --- Delete Button (Visible only in Edit Mode) --- */}
        {params.id && (
          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="mt-3 px-3 py-2 rounded-lg font-medium text-white bg-red-500 cursor-pointer transition-all duration-200 hover:bg-red-600 hover:scale-102 active:scale-98"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoRegisterFormPage;
