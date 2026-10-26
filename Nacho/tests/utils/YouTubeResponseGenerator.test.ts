import { describe, expect, it } from "vitest";

import { Interaction } from "@interfaces/Interaction";
import { YoutubeResponse } from "@interfaces/YoutubeResponse";
import { getVideoData } from "@utils/YouTubeResponseGenerator";

describe("getVideoData", () => {
  it("uses the YouTube ID from the v2 Video.id field", () => {
    const interaction: Interaction = {
      video: {
        id: "dQw4w9WgXcQ",
        title: "Test Video",
        thumbnail: "https://example.com/thumb.jpg",
        duration: 120,
      },
      user: {
        name: "Test",
        full_name: "Test User",
        picture: "",
      },
      id: "interaction-1",
      index: 0,
      priority: 1,
      created_at: "2026-10-25T00:00:00Z",
      modified_at: "2026-10-25T00:00:00Z",
      visibility: 1,
      played_at: null,
      play_count: 0,
    };

    const expected: YoutubeResponse = {
      id: "dQw4w9WgXcQ",
      title: "Test Video",
      thumbnail_src: "https://example.com/thumb.jpg",
      duration: 120,
      author: undefined,
    };

    expect(getVideoData(interaction)).toEqual(expected);
    expect(getVideoData(null)).toBeNull();
  });
});
