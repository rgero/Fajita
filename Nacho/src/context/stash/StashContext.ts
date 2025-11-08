import { createContext, useContext } from "react";

import { Artifact } from '@interfaces/Artifact';

export interface StashContextType {
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
  setSortOption: (option: string) => void;
  sortOption: string;
  stashData: Artifact[];
}

export const StashContext = createContext<StashContextType| null>(null);

export const useStashContext = () => {
  const context = useContext(StashContext);
  if (!context) {
    throw new Error("useStashContext must be used within a StashProvider");
  }
  return context;
};