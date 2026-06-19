import { QueueContext, QueueContextType } from '@context/queue/QueueContext';
import { SocketContext, SocketContextType } from '@context/websocket/WebsocketContext';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import QueueList from '@components/queue/QueueList';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { __setMockDragEndEvent } from '@dnd-kit/core';

vi.mock('@components/queue/QueueCard', () => ({
  __esModule: true,
  default: ({ data }: any) => <div data-testid={`queue-card-${data.id}`}>{data.id}</div>,
}));

vi.mock('@components/queue/EmptyQueue', () => ({
  __esModule: true,
  default: () => <div data-testid="empty-queue" />,
}));

vi.mock('@components/ui/Spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner" />,
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
  },
}));

vi.mock('@dnd-kit/core', () => {
  let mockDragEndEvent: any = null;

  return {
    DndContext: ({ children, onDragEnd }: any) => (
      <div data-testid="dnd-context">
        <button data-testid="trigger-drag-end" onClick={() => onDragEnd?.(mockDragEndEvent)}>
          trigger
        </button>
        {children}
      </div>
    ),
    PointerSensor: vi.fn(),
    closestCenter: vi.fn(),
    useSensor: vi.fn(() => ({ id: 'sensor' })),
    useSensors: vi.fn(() => [{ id: 'sensor' }]),
    __setMockDragEndEvent: (event: any) => {
      mockDragEndEvent = event;
    },
  };
});

vi.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: any) => <div data-testid="sortable-context">{children}</div>,
  verticalListSortingStrategy: vi.fn(),
  arrayMove: (array: any[], from: number, to: number) => {
    const clone = [...array];
    const [moved] = clone.splice(from, 1);
    clone.splice(to, 0, moved);
    return clone;
  },
  useSortable: vi.fn(({ id, disabled }) => ({
    attributes: { 'data-sortable-id': id, 'data-disabled': disabled ? 'true' : 'false' },
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: undefined,
    isDragging: false,
  })),
}));

vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => '',
    },
  },
}));

const interactions = [
  {
    id: 'a',
    index: 10,
    visibility: 1,
    user: { first_name: 'User A' },
    video: { title: 'A', thumbnail: '', duration: 100 },
  },
  {
    id: 'b',
    index: 20,
    visibility: 1,
    user: { first_name: 'User B' },
    video: { title: 'B', thumbnail: '', duration: 100 },
  },
  {
    id: 'c',
    index: 30,
    visibility: 1,
    user: { first_name: 'User C' },
    video: { title: 'C', thumbnail: '', duration: 100 },
  },
] as any;

const renderQueueList = (currentIndex = 20) => {
  const reorderQueue = vi.fn();

  const queueContextValue: QueueContextType = {
    addVideoToQueue: vi.fn(),
    addRandomVideo: vi.fn(),
    checkForPlayNext: vi.fn(),
    connectToQueue: vi.fn(),
    currentlySelected: null,
    deleteVideoFromQueue: vi.fn(),
    error: null,
    getCurrentVideoIndex: vi.fn(),
    getQueueID: vi.fn(),
    getQueueOwner: vi.fn(),
    getVideoIndexInQueue: vi.fn(),
    isActionPending: false,
    isConnected: true,
    isInQueue: vi.fn(),
    isLoading: false,
    queueData: {
      current_index: currentIndex,
      interactions,
    } as any,
    refetch: vi.fn(),
    searchTerm: '',
    setCurrentlySelected: vi.fn(),
    setSearchTerm: vi.fn(),
  };

  const socketContextValue: SocketContextType = {
    socket: undefined,
    jumpQueue: vi.fn(),
    playPause: vi.fn(),
    reorderQueue,
    skipVideo: vi.fn(),
    toggleLock: vi.fn(),
  };

  render(
    <QueueContext.Provider value={queueContextValue}>
      <SocketContext.Provider value={socketContextValue}>
        <QueueList />
      </SocketContext.Provider>
    </QueueContext.Provider>
  );

  return { reorderQueue };
};

describe('QueueList drag-and-drop', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    __setMockDragEndEvent(null);
  });

  it('notifies reorderQueue when an item is moved to a different location', () => {
    const { reorderQueue } = renderQueueList(20);

    __setMockDragEndEvent({
      active: { id: 'a' },
      over: { id: 'c' },
    });

    fireEvent.click(screen.getByTestId('trigger-drag-end'));

    expect(reorderQueue).toHaveBeenCalledTimes(1);
    expect(reorderQueue).toHaveBeenCalledWith('a', 'c', null);
  });

  it('does not notify reorderQueue when dropped on the same item', () => {
    const { reorderQueue } = renderQueueList(20);

    __setMockDragEndEvent({
      active: { id: 'a' },
      over: { id: 'a' },
    });

    fireEvent.click(screen.getByTestId('trigger-drag-end'));

    expect(reorderQueue).not.toHaveBeenCalled();
  });

  it('does not notify reorderQueue when dropped outside the list', () => {
    const { reorderQueue } = renderQueueList(20);

    __setMockDragEndEvent({
      active: { id: 'a' },
      over: null,
    });

    fireEvent.click(screen.getByTestId('trigger-drag-end'));

    expect(reorderQueue).not.toHaveBeenCalled();
  });

  it('does not notify reorderQueue when trying to move the currently playing item', () => {
    const { reorderQueue } = renderQueueList(20);

    __setMockDragEndEvent({
      active: { id: 'b' },
      over: { id: 'c' },
    });

    fireEvent.click(screen.getByTestId('trigger-drag-end'));

    expect(reorderQueue).not.toHaveBeenCalled();
  });

  it('marks only the currently playing item as non-draggable', () => {
    renderQueueList(20);

    const calls = vi.mocked(useSortable).mock.calls.map(([arg]: any[]) => arg);

    const currentCall = calls.find((call: any) => call.id === 'b');
    const firstCall = calls.find((call: any) => call.id === 'a');
    const thirdCall = calls.find((call: any) => call.id === 'c');

    expect(currentCall?.disabled).toBe(true);
    expect(firstCall?.disabled).toBe(false);
    expect(thirdCall?.disabled).toBe(false);
  });
});
