/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services/SessionServices";

export const useSession = () => {
  const { setUser, setSession, logout } = useAuthStore();

  const query = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.data?.user) {
      setUser(query.data.data.user);
      setSession(query.data.data.session || { token: query.data.data });
    } 
    else if (query.isError) {
      const status = (query.error as any)?.response?.status;
      if (status === 401) {
        logout();
      }
    }
  }, [query.isSuccess, query.isError, query.data, query.error, setUser, setSession, logout]);

  return query;
};