import { Interaction } from "../interfaces/Interaction";
import { YoutubeResponse } from "../interfaces/YoutubeResponse";
import { fajitaAxios } from "./axios";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getSearchResults = async (searchTerm: string) => {
  if (!searchTerm) { return; }
  
  const queryURL = backendURL + `/api/search?query=${searchTerm}`;
  const response = await fajitaAxios.get(queryURL);

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

export const getQueue = async (queueID: number) => 
{
  const queueURL = backendURL + `/api/q/${queueID}`;

  const response = await fajitaAxios.get(queueURL);
  if (response.status != 200)
  {
    toast.error("Failed to get queue");
    return;
  }

  const queueData = response.data;
  
  // Sort the Interactions
  queueData.interactions = queueData.interactions.sort((A:Interaction, B:Interaction) => { return A.index - B.index })

  return response.data;
}

export const addToQueue = async (queueID: number, userID: number, videoID: string, playNext: boolean, visibility: number) => 
{
  const queueURL = backendURL + "/api/q/add";

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
      toast.error("Couldn't add video");
      return;
    }
    toast.success("Video added!");
  } catch (err)
  {
    toast.error("Couldn't add video");
  }
}

export const deleteFromQueue = async (queueID: number, interactionID: number) => {
  const deleteURL = backendURL + "/api/q/delete";
  const bodyOfReq = {
    queue_id: queueID,
    interaction_id: interactionID
  }
  
  await fajitaAxios.post(deleteURL, bodyOfReq).catch( (err) => {
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

  const response = await fajitaAxios.get(queuesURL);

  return response.data;


  return [
    {
      "interactions": [
          {
              "user": {
                  "first_name": "Roy"
              },
              "video": {
                  "id": 468,
                  "title": "Rise Against - Re-Education (Through Labor) (Uncensored)",
                  "video_id": "_RYBDTnS7dg",
                  "thumbnail": "https://i.ytimg.com/vi/_RYBDTnS7dg/default.jpg",
                  "duration": 240
              },
              "id": 907,
              "index": 100,
              "play_next": false,
              "created_at": "2024-07-14T02:20:16.946220",
              "visibility": 1
          }
      ],
      "max_index": 100,
      "owner": {
        "first_name": "Roy",
      },
      "id": 40,
      "active": true,
      "locked": false,
      "player_sid": "r65v1jKMisIL1dwxAAAe",
      "current_index": 100,
      "playlist_id": null,
      "created_at": "2024-07-14T00:00:00",
      "modified_at": "2024-07-14T02:20:16.992783"
    },
    {
      "interactions": [
          {
              "user": {
                  "first_name": "Roy"
              },
              "video": {
                  "id": 468,
                  "title": "Rise Against - Re-Education (Through Labor) (Uncensored)",
                  "video_id": "_RYBDTnS7dg",
                  "thumbnail": "https://i.ytimg.com/vi/_RYBDTnS7dg/default.jpg",
                  "duration": 240
              },
              "id": 907,
              "index": 100,
              "play_next": false,
              "created_at": "2024-07-14T02:20:16.946220",
              "visibility": 1
          }
      ],
      "max_index": 100,
      "owner": {
        "first_name": "Vince",
      },
      "id": 41,
      "active": true,
      "locked": false,
      "player_sid": "r65v1jKMisIL1dwxAAAe",
      "current_index": 100,
      "playlist_id": null,
      "created_at": "2024-07-14T00:00:00",
      "modified_at": "2024-07-14T02:20:16.992783"
    },
    {
      "interactions": [
          {
              "user": {
                  "first_name": "Roy"
              },
              "video": {
                  "id": 468,
                  "title": "Rise Against - Re-Education (Through Labor) (Uncensored)",
                  "video_id": "_RYBDTnS7dg",
                  "thumbnail": "https://i.ytimg.com/vi/_RYBDTnS7dg/default.jpg",
                  "duration": 240
              },
              "id": 907,
              "index": 100,
              "play_next": false,
              "created_at": "2024-07-14T02:20:16.946220",
              "visibility": 1
          }
      ],
      "max_index": 100,
      "owner": {
          "first_name": "Anna",
      },
      "id": 42,
      "active": true,
      "locked": false,
      "player_sid": "r65v1jKMisIL1dwxAAAe",
      "current_index": 100,
      "playlist_id": null,
      "created_at": "2024-07-14T00:00:00",
      "modified_at": "2024-07-14T02:20:16.992783"
    },
  ]
}