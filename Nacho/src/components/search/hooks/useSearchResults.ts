import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import { getSearchResults } from '@services/apiFajita';
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export interface SearchResponse {
  isLoading: boolean,
  searchResults: YoutubeResponse[],
  error: Error | null
}

const getQueryResults = async (searchTerm: string) => {
  const results = await getSearchResults(searchTerm as string);
  return results ? results : []; // I need this line so the React Querry doesn't error on empty string
}

export const useSearchResults = (): SearchResponse => {
  const [searchParams] = useSearchParams();
  const searchTerm:string|null = searchParams.get("search");
  const {isLoading, data: searchResults = [], error} = useQuery({queryKey: ["searchResults", searchTerm], queryFn: ()=>getQueryResults(searchTerm as string), refetchInterval: false});
  return { isLoading, searchResults, error};
}