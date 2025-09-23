import { createContext, useContext } from "react";

import { Socket } from "socket.io-client";

export interface SocketContextType {
  socket: Socket | undefined,
  jumpQueue: (index: number) => void,
  playPause: () => void,
  skipVideo: () => void,
  toggleLock: (reason: string) => void
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketProvider = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketProvider must be used within a SocketProvider');
  }
  return context;
};
