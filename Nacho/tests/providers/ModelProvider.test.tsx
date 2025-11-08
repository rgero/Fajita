import { render, screen } from '@testing-library/react';

import { ModalContext } from '@context/modal/ModalContext';
import { ModalProvider } from '@context/modal/ModalProvider';
import { act } from 'react';
import { vi } from 'vitest';

// --- Mock the modal components only for this test file ---
vi.mock('@components/modals/add_modals/AddRandomModal', () => ({
  default: () => <div data-testid="AddRandomModal" />,
}));
vi.mock('@components/modals/add_modals/AddToQueueModal', () => ({
  default: () => <div data-testid="AddToQueueModal" />,
}));
vi.mock('@components/modals/ClearStashModal', () => ({
  default: () => <div data-testid="ClearStashModal" />,
}));
vi.mock('@components/modals/LockQueueModal', () => ({
  default: () => <div data-testid="LockQueueModal" />,
}));
vi.mock('@components/modals/QueueInfoModal', () => ({
  default: () => <div data-testid="QueueInfoModal" />,
}));
vi.mock('@components/modals/ConfirmSkipModal', () => ({
  default: () => <div data-testid="ConfirmSkipModal" />,
}));

const ChildComponent = () => <div>Child Content</div>;

describe('ModalProvider', () => {
  test('renders children and modals', () => {
    render(
      <ModalProvider>
        <ChildComponent />
      </ModalProvider>
    );

    // Child should render
    expect(screen.getByText('Child Content')).toBeInTheDocument();

    // Modals should render (mocked)
    expect(screen.getByTestId('AddRandomModal')).toBeInTheDocument();
    expect(screen.getByTestId('AddToQueueModal')).toBeInTheDocument();
    expect(screen.getByTestId('ClearStashModal')).toBeInTheDocument();
    expect(screen.getByTestId('LockQueueModal')).toBeInTheDocument();
    expect(screen.getByTestId('QueueInfoModal')).toBeInTheDocument();
    expect(screen.getByTestId('ConfirmSkipModal')).toBeInTheDocument();
  });

  test('provides correct initial context values', () => {
    let contextValues: any;

    render(
      <ModalProvider>
        <ModalContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </ModalContext.Consumer>
      </ModalProvider>
    );

    expect(contextValues.anyModalsOpen).toBe(false);
    expect(contextValues.clearStashModalOpen).toBe(false);
    expect(contextValues.lockQueueModalOpen).toBe(false);
    expect(contextValues.queueInfoModalOpen).toBe(false);
    expect(contextValues.addRandomModalOpen).toBe(false);
    expect(contextValues.addToQueueModalOpen).toBe(false);
    expect(contextValues.confirmSkipModalOpen).toBe(false);
    expect(typeof contextValues.toggleClearStashModalOpen).toBe('function');
  });

  test('toggle functions update state correctly', () => {
    let contextValues: any;

    render(
      <ModalProvider>
        <ModalContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </ModalContext.Consumer>
      </ModalProvider>
    );

    // Use act() when updating state
    act(() => contextValues.toggleClearStashModalOpen());
    expect(contextValues.clearStashModalOpen).toBe(true);
    expect(contextValues.anyModalsOpen).toBe(true);

    act(() => contextValues.toggleClearStashModalOpen());
    expect(contextValues.clearStashModalOpen).toBe(false);
    expect(contextValues.anyModalsOpen).toBe(false);

    act(() => contextValues.toggleAddRandomModalOpen());
    expect(contextValues.addRandomModalOpen).toBe(true);
    expect(contextValues.anyModalsOpen).toBe(true);
  });
});
