import { usersApi } from "../api/users.api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await usersApi.get("/refresh", { withCredentials: true });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.acessToken;
  };

  return refresh;
};

export default useRefreshToken;
