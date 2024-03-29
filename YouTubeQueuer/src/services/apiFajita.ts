import { ResponseList } from "../dummyData/data"
import { YoutubeResponse } from "../interfaces/YoutubeResponse";
import axios from "axios";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getCurrentPlaying = async () => {
  return ResponseList[Math.floor(Math.random() * ResponseList.length)];
}

export const getSearchResults = async (searchTerm: string) => {

  if (!searchTerm) { return; }

  const queryURL = backendURL + `/api/search?query=${searchTerm}`;
  const response = await axios.get(queryURL);

  if(response.status != 200)
  {
    toast.error(response.statusText);
    return;
  }

  if (response.data.length == 0)
  {
    toast.error("No Results found");
    return;
  }

  // Process the results
  const results = response.data.filter( (item: YoutubeResponse) => { return item.resultType.toLowerCase().includes("video")});
  return results;
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