import { getSearchResults } from "../services/apiFajita";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useSearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm:string|null = searchParams.get("search");
  const {isLoading, data: searchResults = [], error} = useQuery({queryKey: ["searchResults", searchTerm], queryFn: ()=>getSearchResults(searchTerm)});
  return { isLoading, searchResults, error};
}