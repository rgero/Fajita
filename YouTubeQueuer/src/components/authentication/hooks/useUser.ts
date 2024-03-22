import { getCurrentUser } from "../../../services/apiAuthentication"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
  const { isLoading, fetchStatus, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  
  const isAuthenticated: boolean = user ? user.id > 0 : false;
  return { isLoading, user, fetchStatus, isAuthenticated};
}