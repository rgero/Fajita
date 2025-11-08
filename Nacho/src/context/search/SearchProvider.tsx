import { Artifact } from "@interfaces/Artifact";
import { SearchContext } from "./SearchContext";
import { YoutubeResponse } from "@interfaces/YoutubeResponse";
import { getSearchResults } from "@services/apiFajita";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const getQueryResults = async (searchTerm: string) => {
  const results = await getSearchResults(searchTerm as string);
  return results ? results : [];
}

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [selectedResult, setSelectedResult] = useState<YoutubeResponse|Artifact|null>(null);
  const searchTerm = searchParams.get("search") ?? "";

  const {isLoading, data: searchResults = [], error} = useQuery({queryKey: ["searchResults", searchTerm], queryFn: () => getQueryResults(searchTerm),
    enabled: !!searchTerm
  });

  return (
    <SearchContext.Provider value={{ isLoading, searchResults, error, selectedResult, setSelectedResult }}>
      {children}
    </SearchContext.Provider>
  );
};