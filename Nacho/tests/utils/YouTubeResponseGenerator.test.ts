import { describe, expect, it } from 'vitest';

import { Interaction } from '@interfaces/Interaction';
import { QueueData } from '@interfaces/QueueData';
import { User } from '@interfaces/User';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';
import { getVideoData } from '@utils/YouTubeResponseGenerator';

describe('getVideoData', () => {
  it('returns YoutubeResponse if there is a current interaction', () => {
    const queueData: QueueData = {
      current_interaction: {
        video: {
          id: 10,
          video_id: 'abc123',
          title: 'Test Video',
          thumbnail: 'https://example.com/thumb.jpg',
          duration: 120,
        },
        user: {} as User,
        youtube_id: '',
        id: '',
        index: 0,
        priority: 0,
        created_at: new Date(),
        modified_at: new Date(),
        visibility: 0,
        played: false
      },
      owner: {} as User,
      contributors: [],
      length: 0,
      interactions: [],
      next_interaction: {} as Interaction,
      id: '',
      active: false,
      locked: false,
      player_sid: '',
      current_index: 0,
      playlist_id: '',
      created_at: new Date(),
      modified_at: new Date(),
      last_played: ''
    };

    const expected: YoutubeResponse = {
      id: 'abc123',
      title: 'Test Video',
      thumbnail_src: 'https://example.com/thumb.jpg',
      duration: 120,
    };

    const result = getVideoData(queueData);
    expect(result).toEqual(expected);
  });
});
