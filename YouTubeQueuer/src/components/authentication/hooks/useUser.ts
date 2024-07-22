import { User } from "../../../interfaces/User";
import { getCurrentUser } from "../../../services/apiAuthentication"
import { useQuery } from "@tanstack/react-query"

export interface UserResponse 
{
  isLoading: boolean,
  isAuthenticated: boolean,
  fetchStatus: string,
  user: User | undefined
}

export const useUser = (): UserResponse => {
  const { isLoading, fetchStatus, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated: boolean = user ? user.id > 0 : false;
  return { isLoading, user, fetchStatus, isAuthenticated};
}