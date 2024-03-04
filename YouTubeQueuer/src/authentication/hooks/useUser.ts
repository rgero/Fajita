import { getCurrentUser } from "../../services/apiAuthentication"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
  const { isLoading, fetchStatus, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  
  return { isLoading, user, fetchStatus, isAuthenicated: user?.role === "authenticated" };
}