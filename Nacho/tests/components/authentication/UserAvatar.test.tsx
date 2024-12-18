import { describe, it, vi } from 'vitest';

import React from 'react';
import UserAvatar from '../../../src/components/authentication/UserAvatar';
import renderer from 'react-test-renderer';
import { useQueueProvider } from '../../../src/context/QueueContext';
import { useUser } from '../../../src/components/authentication/hooks/useUser';

// Mock the custom hooks
vi.mock('../../../src/components/authentication/hooks/useUser');
vi.mock('../../../src/context/QueueContext');

// Mock the HeaderMenu component
vi.mock('../../../src/ui/HeaderMenu', () => ({
  __esModule: true,
  default: () => <div>Mocked HeaderMenu</div>,
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

describe('UserAvatar Tests', () => {
  it('renders data returned by useUser', () => {
    const testData = {
      user: {
        id: 1,
        name: 'Test User',
        avatar: 'test-avatar-url',
      },
      isAuthenticated: true,
    };

    // Provide a mock implementation for the useUser hook
    (useUser as vi.Mock).mockReturnValue(testData);

    // Provide a mock implementation for the useQueueProvider hook
    (useQueueProvider as vi.Mock).mockReturnValue({
      queueData: {
        id: 1,
        name: 'Test Queue',
        videos: [],
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      addVideoToQueue: vi.fn(),
      connectToQueue: vi.fn(),
      getQueueID: vi.fn().mockReturnValue(1),
      getQueueOwner: vi.fn().mockReturnValue('Test User'),
      isActionPending: false,
      deleteVideoFromQueue: vi.fn(),
    });

    const component = renderer.create(<UserAvatar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});