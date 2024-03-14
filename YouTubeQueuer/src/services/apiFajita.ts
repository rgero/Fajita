import { ResponseList } from "../dummyData/data"

export const getCurrentPlaying = async () => {
  return ResponseList[Math.floor(Math.random() * ResponseList.length)];
}

export const getSearchResults = async (searchTerm: string|null) => {
  if (!searchTerm) return ResponseList;
  
  const hitList = ResponseList.filter( (option) => option.snippet.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return hitList;
}