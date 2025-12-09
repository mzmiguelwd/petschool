import { useEffect } from "react";
import { usersApiPrivate } from "../api/users.api";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useUsersApiPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = usersApiPrivate.interceptors.request.use(
      (config) => {
        config.withCredentials = true;

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = usersApiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (prevRequest?.url?.includes("/users/auth/refresh/")) {
          return Promise.reject(error);
        }

        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          prevRequest.withCredentials = true;

          return usersApiPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      usersApiPrivate.interceptors.request.eject(requestIntercept);
      usersApiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return usersApiPrivate;
};

export default useUsersApiPrivate;
