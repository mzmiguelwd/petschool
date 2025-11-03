import axios from "axios";

// Coonfiguración Base
const BASE_URL = "http://localhost:8000/api/v1/";

// 1. Base Axios Instance for Non-Authenticated Calls (e.g., Login, Register, or public data)
export const usersApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 2. Base Axios Instance for Authenticated Calls (will be used later for protected routes)
export const usersApiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/**
 * Crea un nuevo registro de usuario (Registro).
 * Corresponde a: POST /api/v1/users/register/
 * @param {object} userData - El objeto de datos para el nuevo usuario (name, email, password, etc.).
 * @returns {Promise} Promesa de Axios que resuelve al objeto del usuario recién creado.
 */
export const createUser = (userData) =>
  usersApi.post("users/register/", userData);

/**
 * Fetches all user records from the API.
 * Corresponds to: GET /api/v1/users/
 * @returns {Promise} Axios promise resolving to the list of users.
 */
export const getAllUsers = () => usersApi.get("users/public-list");

/**
 * Fetches a single user record by ID.
 * Corresponds to: GET /users/api/v1/users/{id}/
 * @param {number|string} id - The unique identifier of the user.
 * @returns {Promise} Axios promise resolving to the list of users.
 */
export const getUser = (id) => usersApi.get(`${id}/`);

/**
 * Deletes a specific user record by ID.
 * Corresponds to: DELETE /users/api/v1/users/{id}/
 * @param {number|string} id - The unique identifier of the user to delete.
 * @returns {Promise} Axios promise resolving upon successful deletion (usually status 204).
 */
export const deleteUser = (id) => usersApi.delete(`${id}/`);

/**
 * Updates an existing user record with new data.
 * Corresponds to: PUT /users/api/v1/users/{id}/
 * @param {number|string} id - The unique identifier of the user to update.
 * @param {object} user - The updated data object for the user.
 * @returns {Promise} Axios promise resolving to the updated user object.
 */
export const updateUser = (id, user) => usersApi.put(`${id}/`, user);
