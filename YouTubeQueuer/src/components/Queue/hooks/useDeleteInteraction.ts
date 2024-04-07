import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFromQueue } from "../../../services/apiFajita";
import toast from "react-hot-toast";
import { useSocket } from "../../../hooks/useWebSocket";

export const useDeleteInteraction = () => {
    const queryClient = useQueryClient();
    const socket = useSocket();
    const {isPending: isDeleting, mutate: deleteInteraction} = useMutation({
        mutationFn: (id: number) => deleteFromQueue(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["queueList"]})
            toast.success("Video deleted!");
            socket.emit("videoDeleted");
        },
        onError: (err) => toast.error(err.message)
    })

    return {isDeleting, deleteInteraction}
}