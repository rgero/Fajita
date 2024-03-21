import { ResponseList } from "../dummyData/data"
import axios from "axios";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getCurrentPlaying = async () => {
  return ResponseList[Math.floor(Math.random() * ResponseList.length)];
}

export const getSearchResults = async (searchTerm: string) => {
  if (searchTerm == null) { searchTerm = ""}
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

export const getQueue = async () => 
{
  const queueURL = backendURL + "/api/q";

  const response = await axios.get(queueURL);
  if (response.status != 200)
  {
    toast.error("Failed to get queue");
  }

  return response.data;
}

export const addToQueue = async (userID: number, videoID: string, playNext: boolean) => 
{
  const queueURL = backendURL + "/api/q/add";

  const bodyOfReq = {
    user_id: userID,
    video_id: videoID,
    play_next: playNext
  }

  await axios.post(queueURL, bodyOfReq);
}