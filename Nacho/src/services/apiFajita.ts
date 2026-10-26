import { Interaction } from "@interfaces/Interaction";
import { Priority } from "@interfaces/Priority";
import { QueueData } from "@interfaces/QueueData";
import { StashData } from "@interfaces/StashData";
import { YoutubeResponse } from "@interfaces/YoutubeResponse";
import { fajitaAxios } from "./axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const apiV1URL = `${backendURL}/api/v1`;

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === "object" && value !== null
);

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (isRecord(error) && isRecord(error.response) && isRecord(error.response.data)) {
    const detail: unknown = error.response.data.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      const messages = detail
        .map((item: unknown) => {
          if (typeof item === "string") return item;
          if (item && typeof item === "object" && "msg" in item && typeof item.msg === "string") {
            return item.msg;
          }
          return "";
        })
        .filter(Boolean);
      if (messages.length > 0) return messages.join("; ");
    }
  }
  return error instanceof Error && error.message ? error.message : fallback;
};

const throwApiError = (error: unknown, fallback: string): never => {
  throw new Error(getErrorMessage(error, fallback));
};

export const getSearchResults = async (searchTerm: string): Promise<YoutubeResponse[] | undefined> => {
  if (!searchTerm) return undefined;

  try {
    const response = await fajitaAxios.post<YoutubeResponse[]>(
      `${apiV1URL}/youtube/search?query=${encodeURIComponent(searchTerm)}`
    );
    return response.data.filter((item) => item.resultType?.toLowerCase().includes("video"));
  } catch (error) {
    return throwApiError(error, "Failed to get search results");
  }
};

export const getQueue = async (queueID: string): Promise<QueueData> => {
  if (!queueID) return {};

  try {
    const response = await fajitaAxios.get<QueueData>(`${apiV1URL}/queues/${queueID}`);
    if (response.status !== 200) {
      throw new Error("Failed to get queue");
    }
    const queueData = response.data;
    if (queueData.interactions) {
      queueData.interactions = [...queueData.interactions].sort((a, b) => a.index - b.index);
    }
    console.log("Fetched queue data:", queueData);

    return queueData;
  } catch (error) {
    return throwApiError(error, "Failed to get queue");
  }
};

export const addToQueue = async (queueID: string, videoID: string, priority: Priority, visibility: number): Promise<Interaction> => {
  if (!queueID) throw new Error("Not connected to queue");

  try {
    const response = await fajitaAxios.post<Interaction>(
      `${apiV1URL}/queues/${queueID}/interact`,
      {
        youtube_id: videoID,
        priority,
        visibility,
      }
    );
    return response.data;
  } catch (error) {
    return throwApiError(error, "Failed to add video");
  }
};

export const deleteFromQueue = async (interactionID: string): Promise<void> => {
  try {
    await fajitaAxios.delete(`${apiV1URL}/interactions/${interactionID}`);
  } catch (error) {
    return throwApiError(error, "Error deleting video");
  }
};

export const getLiveQueues = async (): Promise<QueueData[]> => {
  try {
    const response = await fajitaAxios.get<QueueData[]>(`${apiV1URL}/queues/live`);
    if (response.status !== 200) {
      throw new Error("Failed to get live queues");
    }
    return response.data;
  } catch (error) {
    return throwApiError(error, "Failed to get live queues");
  }
};

export const setQueueLocked = async (queueID: string, locked: boolean): Promise<void> => {
  const action = locked ? "lock" : "unlock";
  try {
    await fajitaAxios.post(`${apiV1URL}/queues/${queueID}/${action}`);
  } catch (error) {
    return throwApiError(error, `Failed to ${action} queue`);
  }
};

export const reorderQueue = async (queueID: string, interactionID: string, previousInteractionID: string | null, nextInteractionID: string | null): Promise<QueueData> => {
  try {
    const response = await fajitaAxios.post<QueueData>(
      `${apiV1URL}/queues/${queueID}/reorder`,
      {
        interaction_id: interactionID,
        prev_interaction_id: previousInteractionID,
        next_interaction_id: nextInteractionID,
      }
    );
    return response.data;
  } catch (error) {
    return throwApiError(error, "Failed to reorder queue");
  }
};

export const notifyQueue = async (queueID: string, message: string): Promise<void> => {
  try {
    await fajitaAxios.post(`${apiV1URL}/queues/${queueID}/notify`, { message });
  } catch (error) {
    return throwApiError(error, "Failed to send queue notification");
  }
};

export const getStashData = async (): Promise<StashData> => {
  try {
    const response = await fajitaAxios.get<StashData>(`${apiV1URL}/stash/`);
    if (response.status !== 200) {
      throw new Error("Failed to get stash data");
    }
    return response.data;
  } catch (error) {
    return throwApiError(error, "Failed to get stash data");
  }
};

export const addToStash = async (videoID: string): Promise<void> => {
  try {
    await fajitaAxios.post(`${apiV1URL}/artifacts/`, { youtube_id: videoID });
  } catch (error) {
    return throwApiError(error, "Failed to add video to stash");
  }
};

export const deleteFromStash = async (id: string): Promise<void> => {
  try {
    await fajitaAxios.delete(`${apiV1URL}/artifacts/${id}`);
  } catch (error) {
    return throwApiError(error, "Error deleting video from stash");
  }
};

export const deleteStash = async (): Promise<void> => {
  try {
    await fajitaAxios.delete(`${apiV1URL}/stash/`);
  } catch (error) {
    return throwApiError(error, "Error deleting stash");
  }
};
