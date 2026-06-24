import { beforeEach, describe, expect, it, vi } from 'vitest';

const getMock = vi.fn();
const postMock = vi.fn();
const deleteMock = vi.fn();

vi.mock('@services/axios', () => ({
  fajitaAxios: {
    get: getMock,
    post: postMock,
    delete: deleteMock,
  },
}));

const loadApi = async (baseUrl = 'http://api.test') => {
  vi.resetModules();
  vi.stubEnv('VITE_BACKEND_URL', baseUrl);
  return import('@services/apiFajita');
};

describe('apiFajita service', () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    deleteMock.mockReset();
    vi.unstubAllEnvs();
  });

  describe('getSearchResults', () => {
    it('returns undefined for an empty search term', async () => {
      const { getSearchResults } = await loadApi();

      const result = await getSearchResults('');

      expect(result).toBeUndefined();
      expect(getMock).not.toHaveBeenCalled();
    });

    it('returns only video results when request succeeds', async () => {
      const { getSearchResults } = await loadApi();
      getMock.mockResolvedValue({
        status: 200,
        data: [
          { id: '1', resultType: 'video' },
          { id: '2', resultType: 'playlist' },
          { id: '3', resultType: 'VIDEO-LIVE' },
          { id: '4' },
        ],
      });

      const result = await getSearchResults('cats & dogs');

      expect(getMock).toHaveBeenCalledWith('http://api.test/api/search?query=cats%20%26%20dogs');
      expect(result).toEqual([
        { id: '1', resultType: 'video' },
        { id: '3', resultType: 'VIDEO-LIVE' },
      ]);
    });

    it('throws when search endpoint does not return 200', async () => {
      const { getSearchResults } = await loadApi();
      getMock.mockResolvedValue({ status: 500, data: [] });

      await expect(getSearchResults('term')).rejects.toThrow('Failed to get search results');
    });
  });

  describe('getQueue', () => {
    it('returns empty object when queue id is empty', async () => {
      const { getQueue } = await loadApi();

      const result = await getQueue('');

      expect(result).toEqual({});
      expect(getMock).not.toHaveBeenCalled();
    });

    it('throws when queue endpoint does not return 200', async () => {
      const { getQueue } = await loadApi();
      getMock.mockResolvedValue({ status: 404, data: {} });

      await expect(getQueue('abc')).rejects.toThrow('Failed to get queue');
      expect(getMock).toHaveBeenCalledWith('http://api.test/api/queue/abc');
    });

    it('returns empty object when queue is not active', async () => {
      const { getQueue } = await loadApi();
      getMock.mockResolvedValue({
        status: 200,
        data: {
          active: false,
          interactions: [{ index: 2 }, { index: 1 }],
        },
      });

      const result = await getQueue('inactive-id');

      expect(result).toEqual({});
    });

    it('sorts interactions by index when queue is active', async () => {
      const { getQueue } = await loadApi();
      getMock.mockResolvedValue({
        status: 200,
        data: {
          active: true,
          interactions: [
            { id: 'b', index: 3 },
            { id: 'a', index: 1 },
            { id: 'c', index: 2 },
          ],
        },
      });

      const result = await getQueue('active-id');

      expect(result).toEqual({
        active: true,
        interactions: [
          { id: 'a', index: 1 },
          { id: 'c', index: 2 },
          { id: 'b', index: 3 },
        ],
      });
    });
  });

  describe('addToQueue', () => {
    it('throws when queue id is empty', async () => {
      const { addToQueue } = await loadApi();

      await expect(addToQueue('', 'user', 'video', 'single', 1)).rejects.toThrow('Not connected to queue');
      expect(postMock).not.toHaveBeenCalled();
    });

    it('posts interaction data when request succeeds', async () => {
      const { addToQueue } = await loadApi();
      postMock.mockResolvedValue({ status: 201 });

      await addToQueue('queue-1', 'user-1', 'video-1', 'single', 2);

      expect(postMock).toHaveBeenCalledWith('http://api.test/api/interaction', {
        queue_id: 'queue-1',
        user_id: 'user-1',
        video_id: 'video-1',
        priority: 'single',
        visibility: 2,
      });
    });

    it('throws locked message when backend returns 403', async () => {
      const { addToQueue } = await loadApi();
      postMock.mockRejectedValue({ response: { status: 403 } });

      await expect(addToQueue('queue-1', 'user-1', 'video-1', 'single', 1)).rejects.toThrow('The Queue is locked');
    });

    it('throws generic message for other add failures', async () => {
      const { addToQueue } = await loadApi();
      postMock.mockRejectedValue(new Error('network'));

      await expect(addToQueue('queue-1', 'user-1', 'video-1', 'single', 1)).rejects.toThrow('Failed to add video');
    });
  });

  describe('deleteFromQueue', () => {
    it('throws backend error message when response has error payload', async () => {
      const { deleteFromQueue } = await loadApi();
      deleteMock.mockRejectedValue({ response: { data: { error: 'Item not found' } } });

      await expect(deleteFromQueue('123')).rejects.toThrow('Item not found');
      expect(deleteMock).toHaveBeenCalledWith('http://api.test/api/interaction/123');
    });

    it('throws generic message when no response exists', async () => {
      const { deleteFromQueue } = await loadApi();
      deleteMock.mockRejectedValue(new Error('network'));

      await expect(deleteFromQueue('123')).rejects.toThrow('Error deleting video');
    });
  });

  describe('getActiveQueues', () => {
    it('returns queue list when response is 200', async () => {
      const { getActiveQueues } = await loadApi();
      getMock.mockResolvedValue({ status: 200, data: [{ id: 'q1' }] });

      const result = await getActiveQueues();

      expect(getMock).toHaveBeenCalledWith('http://api.test/api/queues/active');
      expect(result).toEqual([{ id: 'q1' }]);
    });

    it('throws when response is non-200', async () => {
      const { getActiveQueues } = await loadApi();
      getMock.mockResolvedValue({ status: 500, data: [] });

      await expect(getActiveQueues()).rejects.toThrow('Failed to get active queues');
    });

    it('throws when request errors', async () => {
      const { getActiveQueues } = await loadApi();
      getMock.mockRejectedValue(new Error('timeout'));

      await expect(getActiveQueues()).rejects.toThrow('Failed to get active queues');
    });
  });

  describe('stash helpers', () => {
    it('returns stash data on success', async () => {
      const { getStashData } = await loadApi();
      getMock.mockResolvedValue({ status: 200, data: [{ id: 'a1' }] });

      const result = await getStashData();

      expect(getMock).toHaveBeenCalledWith('http://api.test/api/stash');
      expect(result).toEqual([{ id: 'a1' }]);
    });

    it('throws when getStashData returns non-200', async () => {
      const { getStashData } = await loadApi();
      getMock.mockResolvedValue({ status: 503, data: [] });

      await expect(getStashData()).rejects.toThrow('Failed to get stash data');
    });

    it('throws when addToStash fails', async () => {
      const { addToStash } = await loadApi();
      postMock.mockRejectedValue(new Error('failure'));

      await expect(addToStash('video-1')).rejects.toThrow('Failed to add video to stash');
      expect(postMock).toHaveBeenCalledWith('http://api.test/api/artifact', { video_id: 'video-1' });
    });

    it('throws when deleteFromStash fails', async () => {
      const { deleteFromStash } = await loadApi();
      deleteMock.mockRejectedValue(new Error('failure'));

      await expect(deleteFromStash('artifact-1')).rejects.toThrow('Error deleting video from stash');
      expect(deleteMock).toHaveBeenCalledWith('http://api.test/api/artifact/artifact-1');
    });

    it('throws when deleteStash fails', async () => {
      const { deleteStash } = await loadApi();
      deleteMock.mockRejectedValue(new Error('failure'));

      await expect(deleteStash()).rejects.toThrow('Error deleting stash');
      expect(deleteMock).toHaveBeenCalledWith('http://api.test/api/stash');
    });
  });
});
