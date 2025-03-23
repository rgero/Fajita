import { fireEvent, render, screen } from '@testing-library/react';

import CopyOption from '../../../../src/components/footer/DrawerOptions/CopyOption';
import { copyToClipboard } from '../../../../src/utils/CopyToClipboard'
import { useQueueProvider } from '../../../../src/context/QueueContext';

// Mock the hooks and utilities
vi.mock('../../../../src/context/QueueContext');
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
    (useQueueProvider as jest.Mock).mockReturnValue({ queueData: mockQueueData });
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