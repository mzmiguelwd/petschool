/**
 * Envía una solicitud POST para crear un nuevo canino.
 * El backend asigna automáticamente el campo 'cliente' al usuario autenticado.
 * * @param {object} apiInstance - La instancia de Axios configurada con el Interceptor (useUsersApiPrivate).
 * @param {object} caninoData - Los datos del canino (nombre, raza, edad, tamano, etc.).
 * @returns {Promise<object>} Promesa que resuelve el objeto Canino creado.
 */
export const createCanino = async (apiInstance, caninoData) => {
  try {
    // La ruta es 'caninos/' ya que es la registrada en el router de DRF,
    // y el BASE_URL ya está en la instancia.
    const response = await apiInstance.post("/caninos/", caninoData);

    // Retorna el objeto del canino recién creado
    return response.data;
  } catch (error) {
    // El interceptor se encarga de la renovación de tokens.
    // Si el error persiste (ej: 400 Bad Request por datos inválidos), lo relanzamos.
    console.error("Error al crear el canino:", error.response?.data || error);
    throw error;
  }
};
