import { beforeEach, describe, expect, it, vi } from "vitest";

import { Priority } from "@interfaces/Priority";

const getMock = vi.fn();
const postMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("@services/axios", () => ({
  fajitaAxios: {
    get: getMock,
    post: postMock,
    delete: deleteMock,
  },
}));

const loadApi = async (baseUrl = "https://horchata.test") => {
  vi.resetModules();
  vi.stubEnv("VITE_BACKEND_URL", baseUrl);
  return import("@services/apiFajita");
};

describe("Horchata API service", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    deleteMock.mockReset();
    vi.unstubAllEnvs();
  });

  it("searches through the v2 POST endpoint", async () => {
    const { getSearchResults } = await loadApi();
    const results = [
      { id: "dQw4w9WgXcQ", title: "Video", thumbnail_src: "thumb.jpg", resultType: "video" },
      { id: "playlist", title: "Playlist", thumbnail_src: "playlist.jpg", resultType: "playlist" },
    ];
    postMock.mockResolvedValue({ status: 200, data: results });

    await expect(getSearchResults("cats & dogs")).resolves.toEqual([results[0]]);
    expect(postMock).toHaveBeenCalledWith(
      "https://horchata.test/api/v1/youtube/search?query=cats%20%26%20dogs"
    );
  });

  it("does not make a request for an empty search", async () => {
    const { getSearchResults } = await loadApi();

    await expect(getSearchResults("")).resolves.toBeUndefined();
    expect(postMock).not.toHaveBeenCalled();
  });

  it("loads and sorts a queue without checking the removed active flag", async () => {
    const { getQueue } = await loadApi();
    getMock.mockResolvedValue({
      status: 200,
      data: {
        id: "queue-1",
        interactions: [{ index: 2 }, { index: 1 }],
      },
    });

    await expect(getQueue("queue-1")).resolves.toEqual({
      id: "queue-1",
      interactions: [{ index: 1 }, { index: 2 }],
    });
    expect(getMock).toHaveBeenCalledWith("https://horchata.test/api/v1/queues/queue-1");
  });

  it("returns an empty queue when no queue id is provided", async () => {
    const { getQueue } = await loadApi();

    await expect(getQueue("")).resolves.toEqual({});
    expect(getMock).not.toHaveBeenCalled();
  });

  it("posts the v2 interaction payload without a user id", async () => {
    const { addToQueue } = await loadApi();
    postMock.mockResolvedValue({ status: 201, data: { id: "interaction-1" } });

    await addToQueue("queue-1", "dQw4w9WgXcQ", Priority.normal, 1);

    expect(postMock).toHaveBeenCalledWith(
      "https://horchata.test/api/v1/queues/queue-1/interact",
      { youtube_id: "dQw4w9WgXcQ", priority: Priority.normal, visibility: 1 }
    );
  });

  it("surfaces the backend detail for failed interaction requests", async () => {
    const { addToQueue } = await loadApi();
    postMock.mockRejectedValue({ response: { data: { detail: "The queue is locked" } } });

    await expect(addToQueue("queue-1", "video-1", Priority.normal, 1))
      .rejects.toThrow("The queue is locked");
  });

  it("deletes an interaction through the v2 resource route", async () => {
    const { deleteFromQueue } = await loadApi();
    deleteMock.mockResolvedValue({ status: 204 });

    await deleteFromQueue("interaction-1");

    expect(deleteMock).toHaveBeenCalledWith("https://horchata.test/api/v1/interactions/interaction-1");
  });

  it("loads live queues rather than durable active queues", async () => {
    const { getLiveQueues } = await loadApi();
    const queues = [{ id: "queue-1", locked: false }];
    getMock.mockResolvedValue({ status: 200, data: queues });

    await expect(getLiveQueues()).resolves.toEqual(queues);
    expect(getMock).toHaveBeenCalledWith("https://horchata.test/api/v1/queues/live");
  });

  it("locks and unlocks queues with REST requests", async () => {
    const { setQueueLocked } = await loadApi();
    postMock.mockResolvedValue({ status: 200 });

    await setQueueLocked("queue-1", true);
    await setQueueLocked("queue-1", false);

    expect(postMock).toHaveBeenNthCalledWith(1, "https://horchata.test/api/v1/queues/queue-1/lock");
    expect(postMock).toHaveBeenNthCalledWith(2, "https://horchata.test/api/v1/queues/queue-1/unlock");
  });

  it("reorders queue interactions over REST", async () => {
    const { reorderQueue } = await loadApi();
    const updatedQueue = { id: "queue-1" };
    postMock.mockResolvedValue({ status: 200, data: updatedQueue });

    await expect(reorderQueue("queue-1", "i-2", "i-1", null)).resolves.toEqual(updatedQueue);
    expect(postMock).toHaveBeenCalledWith(
      "https://horchata.test/api/v1/queues/queue-1/reorder",
      { interaction_id: "i-2", prev_interaction_id: "i-1", next_interaction_id: null }
    );
  });

  it("sends queue notifications through REST", async () => {
    const { notifyQueue } = await loadApi();
    postMock.mockResolvedValue({ status: 200 });

    await notifyQueue("queue-1", "Taking a short break");

    expect(postMock).toHaveBeenCalledWith(
      "https://horchata.test/api/v1/queues/queue-1/notify",
      { message: "Taking a short break" }
    );
  });

  it("uses the v2 stash and artifact routes and YouTube ID field", async () => {
    const { getStashData, addToStash, deleteFromStash, deleteStash } = await loadApi();
    getMock.mockResolvedValue({ status: 200, data: { artifacts: [] } });
    postMock.mockResolvedValue({ status: 201 });
    deleteMock.mockResolvedValue({ status: 204 });

    await getStashData();
    await addToStash("dQw4w9WgXcQ");
    await deleteFromStash("artifact-1");
    await deleteStash();

    expect(getMock).toHaveBeenCalledWith("https://horchata.test/api/v1/stash/");
    expect(postMock).toHaveBeenCalledWith(
      "https://horchata.test/api/v1/artifacts/",
      { youtube_id: "dQw4w9WgXcQ" }
    );
    expect(deleteMock).toHaveBeenNthCalledWith(1, "https://horchata.test/api/v1/artifacts/artifact-1");
    expect(deleteMock).toHaveBeenNthCalledWith(2, "https://horchata.test/api/v1/stash/");
  });
});
