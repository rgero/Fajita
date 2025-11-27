import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import FeedbackDialog from '@components/feedback/FeedbackDialog';

// --- Mock FeedbackForm ---
vi.mock('@components/feedback/FeedbackForm', () => ({
  default: () => <div data-testid="feedback-form">Mock Feedback Form</div>,
}));

// --- Mock Dialog ---
vi.mock('@components/ui/Dialog', () => ({
  default: ({ children, open, setOpen, title }: any) => (
    <div data-testid="dialog" data-open={open} data-title={title} onClick={() => setOpen(false)} >
      {children}
    </div>
  ),
}));

// --- Mock Dialog Context ---
const mockToggle = vi.fn();
vi.mock('@context/dialog/DialogContext', () => ({
  useDialogContext: () => ({
    feedbackOpen: true,
    toggleFeedbackOpen: mockToggle,
  }),
}));

describe('FeedbackDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Dialog and FeedbackForm when open', () => {
    render(<FeedbackDialog />);

    // Dialog should render with correct props
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.dataset.open).toBe('true');
    expect(dialog.dataset.title).toBe('Feedback');

    // FeedbackForm should render inside Dialog
    const form = screen.getByTestId('feedback-form');
    expect(form).toBeInTheDocument();
  });

  it('calls toggleFeedbackOpen when Dialog tries to close', () => {
    render(<FeedbackDialog />);

    const dialog = screen.getByTestId('dialog');

    // Simulate closing
    fireEvent.click(dialog);
    expect(mockToggle).toHaveBeenCalled();
  });
});
