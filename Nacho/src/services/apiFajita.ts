import { Interaction } from '@interfaces/Interaction';
import { Priority } from '@interfaces/Priority';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
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
  
  const results = response.data.filter( (item: YoutubeResponse) => { return item.resultType?.toLowerCase().includes("video")});
  return results;
}

export const getQueue = async (queueID: string) => 
{
  // Negative queue id is reserved for invalid queues.
  // No sense in trying to connect.
  if (queueID == "") return {};

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

export const addToQueue = async (queueID: string, userID: string, videoID: string, priority: Priority, visibility: number) => 
{
  if (queueID == "") { throw new Error("Not connected to queue"); }
  const queueURL = backendURL + "/api/interaction";

  const bodyOfReq = {
    queue_id: queueID,
    user_id: userID,
    video_id: videoID,
    priority: priority,
    visibility: visibility,
  }

  await fajitaAxios.post(queueURL, bodyOfReq).catch ( (err) => {
    if (err.response.status == 403)
    {
      throw new Error("The Queue is locked");
    }
    throw new Error("Failed to add video");
  });
}

export const deleteFromQueue = async (interactionID: string) => {
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
  const queuesURL = backendURL + "/api/queues/active";

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


// STASH STUFF
export const getStashData = async () => {
  const stashURL = backendURL + "/api/stash";

  const response = await fajitaAxios.get(stashURL);
  if (response.status != 200)
  {
    throw new Error("Failed to get stash data");
  }
  return response.data;
}

export const addToStash = async (videoID: string) => {
  const stashURL = backendURL + "/api/artifact";
  const bodyOfReq = {
    video_id: videoID,
  }

  await fajitaAxios.post(stashURL, bodyOfReq).catch( () => {
    throw new Error("Failed to add video to stash");
  });
}

export const deleteFromStash = async (id: string) => {
  const deleteURL = backendURL + `/api/artifact/${id}`;
  await fajitaAxios.delete(deleteURL).catch( () => {
    throw new Error("Error deleting video from stash");
  });
}

export const deleteStash = async () => {
  const deleteURL = backendURL + "/api/stash";
  await fajitaAxios.delete(deleteURL).catch( () => {
    throw new Error("Error deleting stash");
  });
}