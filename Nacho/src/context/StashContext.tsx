import { addToStash, deleteFromStash, deleteStash as deleteStashAPI, getStashData } from "../services/apiFajita";
import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Artifact } from "../interfaces/Artifact";

interface StashContextType {
  addVideoToStash: (id: string) => void;
  deleteVideoFromStash: (id: string) => void;
  deleteStash: () => void;
  error: Error | null;
  GetFilteredData: () => Artifact[];
  isActionPending: boolean;
  isInStash: (id: string) => boolean;
  isLoading: boolean;
  refetch: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  stashData: Artifact[];
}

const StashContext = createContext<StashContextType| undefined>(undefined);

const StashProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const { mutateAsync: deleteStash } = useMutation({
    mutationFn: async () => {
      await deleteStashAPI();
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

  const GetFilteredData = () => {
    if (searchTerm === "") return stashData.artifacts;
    return stashData.artifacts.filter((artifact: Artifact) => {
      return artifact.video.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <StashContext.Provider value={{
      addVideoToStash,
      deleteVideoFromStash,
      deleteStash,
      error,
      GetFilteredData,
      isActionPending,
      isInStash,
      isLoading,
      refetch,
      searchTerm,
      setSearchTerm,
      stashData: stashData.artifacts,
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