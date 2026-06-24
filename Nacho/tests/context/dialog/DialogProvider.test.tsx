import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DialogProvider } from '@context/dialog/DialogProvider';
import { useDialogContext } from '@context/dialog/DialogContext';

vi.mock('@components/active_queues/ActiveQueueDialog', () => ({ default: () => <div data-testid="active-queue-dialog" /> }));
vi.mock('@components/feedback/FeedbackDialog', () => ({ default: () => <div data-testid="feedback-dialog" /> }));
vi.mock('@components/queue/QueueDialog', () => ({ default: () => <div data-testid="queue-dialog" /> }));
vi.mock('@components/stash/StashDialog', () => ({ default: () => <div data-testid="stash-dialog" /> }));
vi.mock('@components/settings/UserSettingsDialog', () => ({ default: () => <div data-testid="settings-dialog" /> }));

const TestConsumer = () => {
  const {
    queueOpen,
    activeQueuesOpen,
    feedbackOpen,
    stashOpen,
    settingsOpen,
    areAnyOpen,
    toggleQueueOpen,
    toggleActiveQueuesOpen,
    toggleFeedbackOpen,
    toggleStashOpen,
    toggleSettingsOpen,
  } = useDialogContext();
  return (
    <div>
      <span data-testid="queue-status">{queueOpen ? 'open' : 'closed'}</span>
      <span data-testid="active-queues-status">{activeQueuesOpen ? 'open' : 'closed'}</span>
      <span data-testid="feedback-status">{feedbackOpen ? 'open' : 'closed'}</span>
      <span data-testid="stash-status">{stashOpen ? 'open' : 'closed'}</span>
      <span data-testid="settings-status">{settingsOpen ? 'open' : 'closed'}</span>
      <span data-testid="any-open">{areAnyOpen ? 'yes' : 'no'}</span>
      <button data-testid="toggle-queue" onClick={toggleQueueOpen}>Toggle Queue</button>
      <button data-testid="toggle-active-queues" onClick={toggleActiveQueuesOpen}>Toggle Active Queues</button>
      <button data-testid="toggle-feedback" onClick={toggleFeedbackOpen}>Toggle Feedback</button>
      <button data-testid="toggle-stash" onClick={toggleStashOpen}>Toggle Stash</button>
      <button data-testid="toggle-settings" onClick={toggleSettingsOpen}>Toggle Settings</button>
    </div>
  );
};

describe('DialogProvider', () => {
  it('initializes with all dialogs closed', () => {
    render(
      <DialogProvider>
        <TestConsumer />
      </DialogProvider>
    );

    expect(screen.getByTestId('queue-status').textContent).toBe('closed');
    expect(screen.getByTestId('any-open').textContent).toBe('no');
  });

  it('toggles a specific dialog and updates areAnyOpen', () => {
    render(
      <DialogProvider>
        <TestConsumer />
      </DialogProvider>
    );

    const queueBtn = screen.getByTestId('toggle-queue');
    
    // Open Queue
    fireEvent.click(queueBtn);
    expect(screen.getByTestId('queue-status').textContent).toBe('open');
    expect(screen.getByTestId('any-open').textContent).toBe('yes');

    // Close Queue
    fireEvent.click(queueBtn);
    expect(screen.getByTestId('queue-status').textContent).toBe('closed');
    expect(screen.getByTestId('any-open').textContent).toBe('no');
  });

  it('keeps areAnyOpen true if at least one dialog is open', () => {
    render(
      <DialogProvider>
        <TestConsumer />
      </DialogProvider>
    );

    // Open Queue and Settings
    fireEvent.click(screen.getByTestId('toggle-queue'));
    fireEvent.click(screen.getByTestId('toggle-settings'));
    expect(screen.getByTestId('any-open').textContent).toBe('yes');

    // Close only Queue
    fireEvent.click(screen.getByTestId('toggle-queue'));
    // should still be "yes" because Settings is open
    expect(screen.getByTestId('any-open').textContent).toBe('yes');
  });

  it('renders all dialog components', () => {
    render(
      <DialogProvider>
        <div>Content</div>
      </DialogProvider>
    );

    expect(screen.getByTestId('queue-dialog')).toBeTruthy();
    expect(screen.getByTestId('settings-dialog')).toBeTruthy();
    expect(screen.getByTestId('active-queue-dialog')).toBeTruthy();
    expect(screen.getByTestId('stash-dialog')).toBeTruthy();
    expect(screen.getByTestId('feedback-dialog')).toBeTruthy();
  });

  it('toggles active queues, feedback, and stash dialogs', () => {
    render(
      <DialogProvider>
        <TestConsumer />
      </DialogProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-active-queues'));
    fireEvent.click(screen.getByTestId('toggle-feedback'));
    fireEvent.click(screen.getByTestId('toggle-stash'));

    expect(screen.getByTestId('active-queues-status').textContent).toBe('open');
    expect(screen.getByTestId('feedback-status').textContent).toBe('open');
    expect(screen.getByTestId('stash-status').textContent).toBe('open');
    expect(screen.getByTestId('any-open').textContent).toBe('yes');
  });
});