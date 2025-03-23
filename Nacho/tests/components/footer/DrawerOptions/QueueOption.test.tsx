import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import QueueOption from '../../../../src/components/footer/DrawerOptions/QueueOption';

describe('QueueOption', () => {
  const mockSetQueueOpen = vi.fn();

  const renderComponent = (isQueueOpen: boolean) => {
    render(<QueueOption isQueueOpen={isQueueOpen} setQueueOpen={mockSetQueueOpen} />);
  };

  it('should render correctly when queue is open', () => {
    renderComponent(true);
    expect(screen.getByText('Collapse Queue')).toBeInTheDocument();
  });

  it('should render correctly when queue is closed', () => {
    renderComponent(false);
    expect(screen.getByText('View Queue')).toBeInTheDocument();
  });

  it('should call setQueueOpen with false when queue is open and button is clicked', () => {
    renderComponent(true);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetQueueOpen).toHaveBeenCalledWith(false);
  });

  it('should call setQueueOpen with true when queue is closed and button is clicked', () => {
    renderComponent(false);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockSetQueueOpen).toHaveBeenCalledWith(true);
  });
});