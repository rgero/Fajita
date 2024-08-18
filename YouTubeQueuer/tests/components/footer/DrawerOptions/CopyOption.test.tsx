import { fireEvent, render, screen } from '@testing-library/react';

import CopyOption from '../../../../src/components/Footer/DrawerOptions/CopyOption';
import { copyToClipboard } from '../../../../src/utils/CopyToClipboard'
import { useYouTubeQueue } from '../../../../src/hooks/useYouTubeQueue';

// Mock the hooks and utilities
vi.mock('../../../../src/hooks/useYouTubeQueue');
vi.mock('../../../../src/utils/CopyToClipboard');

describe('CopyOption', () => {
  const mockQueueData = {
    current_index: 1,
    interactions: [
      { index: 0, url: 'http://example.com/0' },
      { index: 1, url: 'http://example.com/1' },
    ],
  };

  beforeEach(() => {
    (useYouTubeQueue as jest.Mock).mockReturnValue({ queueData: mockQueueData });
    (copyToClipboard as jest.Mock).mockClear();
  });

  it('should render correctly', () => {
    render(<CopyOption />);
    expect(screen.getByText('Copy Video URL')).toBeInTheDocument();
  });

  it('should set currentlyPlaying state based on queueData', () => {
    render(<CopyOption />);
    expect(screen.getByText('Copy Video URL')).toBeInTheDocument();
    // Simulate the effect
    expect(copyToClipboard).not.toHaveBeenCalled();
  });

  it('should call copyToClipboard with currentlyPlaying on click', () => {
    render(<CopyOption />);
    const listItem = screen.getByRole('button');
    fireEvent.click(listItem);
    expect(copyToClipboard).toHaveBeenCalledWith(mockQueueData.interactions[1]);
  });
});