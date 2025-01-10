import { addToStash, deleteFromStash, getStashData } from "../services/apiFajita";
import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Artifact } from "../interfaces/Artifact";
import { StashData } from "../interfaces/StashData";

interface StashContextType {
  isLoading: boolean;
  stashData: StashData;
  error: Error | null;
  refetch: () => void;
  addVideoToStash: (id: string) => void;
  isActionPending: boolean;
  isInStash: (id: string) => boolean;
  deleteVideoFromStash: (id: string) => void;
}

const StashContext = createContext<StashContextType| undefined>(undefined);

const StashProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { isLoading, data: stashData = {}, error, refetch } = useQuery({
    queryKey: ["stashData"],
    queryFn: getStashData
  });

  const { mutateAsync: addVideoToStash } = useMutation({
    mutationFn: async (id: string) => {
      await addToStash(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stashData"] });
    },
    onError: (err: any) => {
      throw err;
    }
  });

  const { isPending: isActionPending, mutateAsync: deleteVideoFromStash } = useMutation({
    mutationFn: async (id: string) => {
      const artifact = stashData.artifacts.find((artifact: Artifact) => artifact.video.video_id === id);
      await deleteFromStash(artifact.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stashData"] });
    },
    onError: (err: any) => {
      throw err;
    },
  });

  const isInStash = (id: string|undefined) => {
    if (!id || !stashData.artifacts) { return false; }
    return stashData.artifacts.some((artifact: Artifact) => artifact.video.video_id === id);
  }

  return (
    <StashContext.Provider value={{
      isLoading,
      stashData,
      error,
      refetch,
      addVideoToStash,
      deleteVideoFromStash,
      isInStash,
      isActionPending
    }}>
      {children}
    </StashContext.Provider>
  )
}

const useStashProvider = () => {
  const context = useContext(StashContext);
  if (!context) {
    throw new Error("useStashProvider must be used within a StashProvider");
  }
  return context;
};

export { StashProvider, useStashProvider };