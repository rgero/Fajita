import { ResponseList } from "../dummyData/data"
import axios from "axios";
import toast from "react-hot-toast";

export const getCurrentPlaying = async () => {
  return ResponseList[Math.floor(Math.random() * ResponseList.length)];
}

export const getSearchResults = async (searchTerm: string|null) => {
  if (!searchTerm) return ResponseList;

  const youTubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${searchTerm}&key=${import.meta.env.VITE_YOUTUBE_KEY}`
  const response = await axios.get(youTubeURL);

  if(response.status != 200)
  {
    toast.error(response.statusText);
    return;
  }
  const hitList = response.data.items;
  return hitList;
}