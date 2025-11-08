import { createContext, useContext } from "react";

import { Artifact } from "@interfaces/Artifact";
import { YoutubeResponse } from "@interfaces/YoutubeResponse";

export interface SearchContextType {
  searchResults: YoutubeResponse[];
  selectedResult: YoutubeResponse|Artifact|null;
  setSelectedResult: (result: YoutubeResponse|Artifact|null) => void;
  isLoading: boolean;
  error: Error | null
}

export const SearchContext = createContext<SearchContextType | null>(null);

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error('useSearchContext must be used within an SearchProvider');
  }
  return context;
};