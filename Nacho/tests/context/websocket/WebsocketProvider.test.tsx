import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import InfoToast from "@components/ui/InfoToast";
import * as api from "@services/apiFajita";
import io from "socket.io-client";
import { SocketProvider } from "@context/websocket/WebsocketProvider";
import { useQueueContext } from "@context/queue/QueueContext";
import { useSocketProvider } from "@context/websocket/WebsocketContext";

const { invalidateQueriesMock, queryClientMock } = vi.hoisted(() => {
  const invalidateQueriesMock = vi.fn();
  return {
    invalidateQueriesMock,
    queryClientMock: { invalidateQueries: invalidateQueriesMock },
  };
});

vi.mock("socket.io-client", () => {
  const socket = {
    connected: true,
    on: vi.fn(),
    once: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  return { default: vi.fn(() => socket), io: vi.fn(() => socket) };
});

vi.mock("@context/authentication/AuthenticationContext", () => ({
  useAuth: () => ({
    user: {
      id: "e270ab4f-0666-4957-aaff-6817905b6899",
      full_name: "Test User",
    },
  }),
}));

vi.mock("@context/queue/QueueContext", () => ({
  useQueueContext: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => queryClientMock,
}));

vi.mock("@services/apiFajita", () => ({
  notifyQueue: vi.fn(),
  reorderQueue: vi.fn(),
  setQueueLocked: vi.fn(),
}));

vi.mock("@components/ui/InfoToast", () => ({
  default: vi.fn(),
}));

const TestConsumer = () => {
  const { playPause, skipVideo, jumpQueue, reorderQueue, toggleLock, resetProgress } = useSocketProvider();
  return (
    <div>
      <button onClick={() => playPause(1)}>Play</button>
      <button onClick={skipVideo}>Skip</button>
      <button onClick={() => jumpQueue(4)}>Jump</button>
      <button onClick={() => reorderQueue("i-2", "i-1", null)}>Reorder</button>
      <button onClick={() => toggleLock("Taking a break")}>Toggle lock</button>
      <button onClick={resetProgress}>Restart</button>
    </div>
  );
};

const getSocket = () => (io as any).mock.results[0].value as any;
const getEventCallback = (socket: any, event: string) => (
  socket.on.mock.calls.find((call: any[]) => call[0] === event)?.[1]
);

describe("SocketProvider", () => {
  const mockRefetch = vi.fn();
  const queueData = {
    id: "queue-123",
    locked: false,
    current_index: 1,
    interactions: [{ index: 1 }, { index: 2 }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_BACKEND_URL", "http://api.test");
    vi.stubEnv("VITE_WEBSOCKET_URL", "api.test");
    vi.mocked(useQueueContext).mockReturnValue({
      queueData,
      refetch: mockRefetch,
    } as any);
    vi.mocked(api.notifyQueue).mockResolvedValue();
    vi.mocked(api.reorderQueue).mockResolvedValue({});
    vi.mocked(api.setQueueLocked).mockResolvedValue();
    mockRefetch.mockResolvedValue({});
  });

  it("connects to the player namespace and joins after connection", () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);
    const socket = getSocket();

    expect(io).toHaveBeenCalledWith("http://api.test/player", {
      withCredentials: true,
      query: { user_name: "Test User" },
    });
    expect(socket.emit).toHaveBeenCalledWith("join_queue", {
      queue_id: "queue-123",
      user_id: "e270ab4f-0666-4957-aaff-6817905b6899",
    });
  });

  it("requests playback state after join_ack and sends v2 playback events", async () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);
    const socket = getSocket();

    await act(async () => {
      getEventCallback(socket, "join_ack")({ queue_id: "queue-123" });
    });
    expect(socket.emit).toHaveBeenCalledWith("request_playback_state", { queue_id: "queue-123" });

    fireEvent.click(screen.getByText("Play"));
    fireEvent.click(screen.getByText("Jump"));
    fireEvent.click(screen.getByText("Skip"));
    fireEvent.click(screen.getByText("Restart"));

    expect(socket.emit).toHaveBeenCalledWith("request_play_pause", { queue_id: "queue-123", state: 1 });
    expect(socket.emit).toHaveBeenCalledWith("play_now", { queue_id: "queue-123", index: 4 });
    expect(socket.emit).toHaveBeenCalledWith("play_now", { queue_id: "queue-123", index: 2 });
    expect(socket.emit).toHaveBeenCalledWith("request_seek", { queue_id: "queue-123", progress: 0 });
  });

  it("uses REST for reorder, lock, and unlock-related notifications", async () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);

    await act(async () => {
      fireEvent.click(screen.getByText("Reorder"));
      fireEvent.click(screen.getByText("Toggle lock"));
    });

    expect(api.reorderQueue).toHaveBeenCalledWith("queue-123", "i-2", "i-1", null);
    expect(api.setQueueLocked).toHaveBeenCalledWith("queue-123", true);
    expect(api.notifyQueue).toHaveBeenCalledWith("queue-123", "Taking a break");
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("handles queue updates, status messages, and v2 notifications", () => {
    render(<SocketProvider><TestConsumer /></SocketProvider>);
    const socket = getSocket();

    act(() => {
      getEventCallback(socket, "queue_updated")();
      getEventCallback(socket, "status")({ message: "Queue is locked" });
      getEventCallback(socket, "notification")({
        type: "queue_lock_changed",
        data: { locked: true },
      });
      getEventCallback(socket, "live_queues_updated")({ queue_id: "queue-123" });
    });

    expect(mockRefetch).toHaveBeenCalled();
    expect(InfoToast).toHaveBeenCalledWith("Queue is locked");
    expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ["liveQueues"] });
  });

  it("leaves the queue and disconnects after leave_ack", () => {
    const { unmount } = render(<SocketProvider><TestConsumer /></SocketProvider>);
    const socket = getSocket();
    act(() => getEventCallback(socket, "join_ack")({ queue_id: "queue-123" }));

    unmount();

    expect(socket.emit).toHaveBeenCalledWith("leave_queue", { queue_id: "queue-123" });
    const leaveAck = socket.once.mock.calls.find((call: any[]) => call[0] === "leave_ack")?.[1];
    expect(leaveAck).toBeTypeOf("function");
    leaveAck({ queue_id: "queue-123" });
    expect(socket.disconnect).toHaveBeenCalled();
  });

  it("does not create a socket without a queue id", () => {
    vi.mocked(useQueueContext).mockReturnValue({
      queueData: { id: "" },
      refetch: mockRefetch,
    } as any);

    render(<SocketProvider><TestConsumer /></SocketProvider>);

    expect(io).not.toHaveBeenCalled();
  });
});
