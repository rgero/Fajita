import { useMutation, useQueryClient } from "@tanstack/react-query"

import { signInWithGoogle } from "../../services/apiAuthentication"
import toast from "react-hot-toast";

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  const {mutate: login, isPending} = useMutation({
    mutationFn: () => signInWithGoogle(),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (error) => {
      console.log("ERROR: ", error);
      toast.error("Provided email and password are not correct");
    }
  });

  return {login, isPending};
}