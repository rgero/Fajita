import { addToStash, deleteFromStash, deleteStash as deleteStashAPI, getStashData } from '@services/apiFajita';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Artifact } from '@interfaces/Artifact';
import { StashContext } from "./StashContext";
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { useState } from "react";

export const StashProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useLocalStorageState("date_newest", "stashSortOption");

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
      if (!artifact) {
        throw new Error("Artifact not found in stash");
      }
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
    let filteredData = stashData.artifacts || [];
    
    // Filter by search term
    if (searchTerm !== "") {
      filteredData = filteredData.filter((artifact: Artifact) => {
        return artifact.video.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Sort the data
    const sortedData = [...filteredData].sort((a: Artifact, b: Artifact) => {
      switch (sortOption) {
        case "date_newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "date_oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "title_asc":
          return a.video.title.localeCompare(b.video.title);
        case "title_desc":
          return b.video.title.localeCompare(a.video.title);
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // Default to newest first
      }
    });

    return sortedData;
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
      setSortOption,
      sortOption,
      stashData: stashData.artifacts,
    }}>
      {children}
    </StashContext.Provider>
  )
}
