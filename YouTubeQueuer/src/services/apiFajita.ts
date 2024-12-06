import { Interaction } from "../interfaces/Interaction";
import { YoutubeResponse } from "../interfaces/YoutubeResponse";
import { fajitaAxios } from "./axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getSearchResults = async (searchTerm: string) => {
  if (!searchTerm) { return; }
  
  const queryURL = backendURL + `/api/search?query=${searchTerm}`;
  const response = await fajitaAxios.get(queryURL);

  if(response.status != 200)
  {
    throw new Error("Failed to get search results");
  }
  
  // Process the results
  const results = response.data.filter( (item: YoutubeResponse) => { return item.resultType.toLowerCase().includes("video")});
  return results;
}

export const getQueue = async (queueID: number) => 
{
  // Negative queue id is reserved for invalid queues.
  // No sense in trying to connect.
  if (queueID == -1) return {};

  const queueURL = backendURL + `/api/queue/${queueID}`;

  const response = await fajitaAxios.get(queueURL);
  if (response.status != 200)
  {
    throw new Error("Failed to get queue");
  }

  const queueData = response.data;
  if (!queueData.active)
  {
    return {};
  }
  
  queueData.interactions = queueData.interactions.sort((A:Interaction, B:Interaction) => { return A.index - B.index })

  return response.data;
}

export const addToQueue = async (queueID: number, userID: number, videoID: string, playNext: boolean, visibility: number) => 
{
  const queueURL = backendURL + "/api/interaction";

  const bodyOfReq = {
    queue_id: queueID,
    user_id: userID,
    video_id: videoID,
    play_next: playNext,
    visibility: visibility,
  }
  
  try {
    const response = await fajitaAxios.post(queueURL, bodyOfReq);
    if (response.status != 200)
    {
      throw new Error("Failed to add video");
    }
  } catch {
    throw new Error("Failed to add video");
  }
}

export const deleteFromQueue = async (queueID: number, interactionID: number) => {
  const deleteURL = backendURL + `/api/interaction/${interactionID}`;
  await fajitaAxios.delete(deleteURL).catch( (err) => {
    if (err.response)
    {
      const errMessage = err.response.data.error;
      throw new Error(errMessage);
    }
    throw new Error("Error deleting video");
  }); 
}


// QUEUE STUFF
export const getActiveQueues = async () => {
  const queuesURL = backendURL + "/api/queues";

  try {
    const response = await fajitaAxios.get(queuesURL);
    if (response.status != 200)
    {
      throw new Error("Failed to get active queues");
    }
    return response.data;
  } catch {
    throw new Error("Failed to get active queues");
  }

}