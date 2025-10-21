import { useEffect, useState } from "react";
import { getAllUsers } from "../api/users.api.js";

import UserCard from "./UserCard";

const UsersList = () => {
  // State to store the list of users fetched from the API.
  const [users, setUsers] = useState([]);

  // Hook to run side effects (data fetching) after the component mounts.
  useEffect(() => {
    // Async function to call the API and load user data.
    async function loadUsers() {
      // Fetch users from the backend API.
      const res = await getAllUsers();
      // Update the component state with the fetched data.
      setUsers(res.data);
    }

    loadUsers();
    // The empty dependency array ensures this effects runs only once after the initial render.
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto mt-24 px-4">
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
