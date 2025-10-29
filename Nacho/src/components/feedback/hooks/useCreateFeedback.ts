import { submitFeedback } from "@services/apiGithubLogger";
import toast from "react-hot-toast";
import { useMutation, } from "@tanstack/react-query";

export const useCreateFeedback = () => {
  const {isPending: isAdding, mutate: addFeedback} = useMutation({
      mutationFn: ({user, title, description}: {user: string|undefined, title: string, description: string}) => submitFeedback({user, title, description}),
      onSuccess: () => {
          toast.success("Feedback Submitted");
      },
      onError: (err) => toast.error(err.message)
  })

  return {isAdding, addFeedback}
}