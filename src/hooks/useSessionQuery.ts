import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services/authService";

export const useSessionQuery = () => {
  const { setAuth, clearAuth } = useAuthStore();

  const query = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
      console.log("QUERY DATA:", query.data);

    if (query.data?.success) {
      setAuth(query.data.data); 
      console.log(query.data.data);
      
    }

    if (query.isError) {
      clearAuth();
    }
  }, [query.data, query.isError]);

  return query;
};