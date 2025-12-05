import { usersApiPrivate } from "../api/users.api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await usersApiPrivate.post(
      "/users/auth/refresh/",
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.access;

    setAuth((prev) => ({
      ...prev,
      accessToken: newAccessToken,
    }));

    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
