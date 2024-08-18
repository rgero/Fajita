import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { OpenYouTubeURL } from '../../../../src/utils/OpenYoutubeURL';
import YoutubeOption from '../../../../src/components/Footer/DrawerOptions/YoutubeOption';
import toast from 'react-hot-toast';
import { useYouTubeQueue } from '../../../../src/hooks/useYouTubeQueue';

// Mock the hooks and utilities
vi.mock('../../../../src/hooks/useYouTubeQueue');
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
    (useYouTubeQueue as jest.Mock).mockReturnValue({ queueData: mockQueueData });
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
    (useYouTubeQueue as jest.Mock).mockReturnValue({ queueData: { current_index: 1, interactions: [] } });
    render(<YoutubeOption />);
    const listItem = screen.getByRole('button');
    fireEvent.click(listItem);
    expect(toast.error).toHaveBeenCalledWith('Nothing currently playing to open');
    expect(OpenYouTubeURL).not.toHaveBeenCalled();
  });
});