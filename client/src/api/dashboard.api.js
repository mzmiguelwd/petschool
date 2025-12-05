import axios from "axios";

const API_URL = "http://localhost:8000/api/dashboard";

// =================================================================
// FUNCIÓN PRINCIPAL DEL DASHBOARD CLIENTE (USA EL HOOK SEGURO)
// =================================================================
/**
 * Obtiene los datos del dashboard del cliente, usando la instancia de Axios
 * ya configurada con el token de acceso (proporcionada por useUsersApiPrivate).
 * * @param {object} apiInstance - La instancia de Axios configurada con el Interceptor.
 * @returns {Promise<object>} Promesa que resuelve los datos del dashboard.
 */
export const getDashboardData = (apiInstance) => {
  // CRÍTICO: Usamos la instancia apiInstance pasada como parámetro.
  // Usamos la URL RELATIVA que se ancla al BASE_URL de la instancia privada.
  return apiInstance
    .get("dashboard/cliente/")
    .then((response) => response.data)
    .catch((error) => {
      // El interceptor ya intentó el refresh; si falla, lanzamos el error
      console.error(
        "Fallo al obtener datos del dashboard después de intentos:",
        error
      );
      throw error;
    });
};

// export const getDashboardData1 = async () => {
//   // Fetch both director and cliente data concurrently
//   const [directorRes, clienteRes] = await Promise.all([
//     axios.get(`${API_URL}/director/`),
//     axios.get(`${API_URL}/cliente/`),
//   ]);
//   return {
//     director: directorRes.data,
//     cliente: clienteRes.data,
//   };
// };

export const downloadCSV = async (tipo) => {
  const response = await axios.get(`${API_URL}/reporte/${tipo}/`, {
    responseType: "blob", // importante para descargas
  });

  // Crear descarga
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `reporte_${tipo}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
