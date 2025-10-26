import axios from "axios";

/**
 * Creates an axios instance for the Matriculas API service.
 * This sets a consistent base URL for all matricula-related requests.
 */
const matriculasApi = axios.create({
  baseURL: "http://localhost:8000/api/matriculas/",
});

/**
 * Fetches all matriculas.
 * Corresponds to: GET /api/matriculas/
 * @returns {Promise} Axios promise resolving to the list of matriculas.
 */
export const getAllMatriculas = () => matriculasApi.get("/");

/**
 * Fetches a single matricula by ID.
 * Corresponds to: GET /api/matriculas/{id}/
 * @param {number|string} id - The unique identifier of the matricula.
 */
export const getMatricula = (id) => matriculasApi.get(`${id}/`);

/**
 * Creates a new matricula.
 * Corresponds to: POST /api/matriculas/
 * @param {object} data - The data for the new matricula.
 */
export const createMatricula = (data) => matriculasApi.post("/", data);

/**
 * Deletes a matricula by ID.
 * Corresponds to: DELETE /api/matriculas/{id}/
 * @param {number|string} id - The unique identifier of the matricula to delete.
 */
export const deleteMatricula = (id) => matriculasApi.delete(`${id}/`);

/**
 * Updates an existing matricula.
 * Corresponds to: PUT /api/matriculas/{id}/
 * @param {number|string} id - The unique identifier of the matricula to update.
 * @param {object} data - The updated matricula data.
 */
export const updateMatricula = (id, data) => matriculasApi.put(`${id}/`, data);
