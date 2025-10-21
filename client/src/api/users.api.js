import axios from "axios";

/**
 * Creates an axios instance for the User API service.
 * This establishes the base URL for all subsequent user-related requests,
 * ensuring consistency (e.g., all requests go to http://localhost:8000/users/api/vi/users/).
 */
const usersApi = axios.create({
  baseURL: "http://localhost:8000/users/api/v1/users/",
});

/**
 * Fetches all user records from the API.
 * Corresponds to: GET /users/api/v1/users/
 * @returns {Promise} Axios promise resolving to the list of users.
 */
export const getAllUsers = () => usersApi.get("/");

/**
 * Fetches a single user record by ID.
 * Corresponds to: GET /users/api/v1/users/{id}/
 * @param {number|string} id - The unique identifier of the user.
 * @returns {Promise} Axios promise resolving to the list of users.
 */
export const getUser = (id) => usersApi.get(`${id}/`);

/**
 * Creates a new user record.
 * Corresponds to: POST /users/api/v1/users/
 * @param {object} user - The data object for the new user (name, email, etc.).
 * @returns {Promise} Axios promise resolving to the newly created user object.
 */
export const createUser = (user) => usersApi.post("/", user);

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
