import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { OpenYouTubeURL } from '../../../../src/utils/OpenYoutubeURL';
import React from 'react';
import YoutubeOption from '../../../../src/components/Footer/DrawerOptions/YoutubeOption';
import toast from 'react-hot-toast';
import { useQueueProvider } from '../../../../src/context/QueueContext';

// Mock the hooks and utilities
vi.mock('../../../../src/context/QueueContext');
vi.mock('../../../../src/utils/OpenYoutubeURL');
vi.mock('react-hot-toast');

describe('YoutubeOption', () => {
  const mockQueueData = {
    current_index: 1,
    interactions: [
      { index: 1, url: 'https://youtube.com/watch?v=test' },
    ],
  };

  beforeEach(() => {
    (useQueueProvider as vi.Mock).mockReturnValue({ queueData: mockQueueData });
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<YoutubeOption />);
    expect(screen.getByText('Open in YouTube App')).toBeInTheDocument();
  });

  it('should handle button click when currently playing', () => {
    render(<YoutubeOption />);
    const listItem = screen.getByRole('button');
    fireEvent.click(listItem);
    expect(OpenYouTubeURL).toHaveBeenCalledWith(mockQueueData.interactions[0]);
  });

  it('should show error toast when nothing is currently playing', () => {
    (useQueueProvider as vi.Mock).mockReturnValue({ queueData: { current_index: -1, interactions: [] } });
    render(<YoutubeOption />);
    const listItem = screen.getByRole('button');
    fireEvent.click(listItem);
    expect(toast.error).toHaveBeenCalledWith('Nothing currently playing to open');
    expect(OpenYouTubeURL).not.toHaveBeenCalled();
  });
});