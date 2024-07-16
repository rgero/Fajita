import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFromQueue } from "../../../services/apiFajita";
import toast from "react-hot-toast";
import { useQueueProvider } from "../../../context/QueueContext";

export const useDeleteInteraction = () => {
    const queryClient = useQueryClient();
    const {getQueueID} = useQueueProvider();
    
    const {isPending: isDeleting, mutate: deleteInteraction} = useMutation({
        mutationFn: (id: number) => deleteFromQueue(getQueueID(), id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["queueList"]})
            toast.success("Video deleted!");
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return {isDeleting, deleteInteraction}
}