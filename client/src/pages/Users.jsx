import { useState, useEffect } from "react";
import axios from "axios";
import useUsersApiPrivate from "../hooks/useUsersApiPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const usersApiPrivate = useUsersApiPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await usersApiPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        // Petición cancelada: ignorar (React StrictMode/Unmount)
        if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
          console.log("Request canceled:", error.message || error);
          return;
        }
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
