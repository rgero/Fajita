import { createContext, useContext } from "react";

import { Socket } from "socket.io-client";

export type PlaybackState = 1 | 2;

export interface SocketContextType {
  socket: Socket | undefined,
  jumpQueue: (index: number) => void,
  playPause: (state: PlaybackState) => void,
  reorderQueue: (interactionId: string, prevInteractionId: string | null, nextInteractionId: string | null) => Promise<void>,
  resetProgress: () => void,
  skipVideo: () => void,
  toggleLock: (reason: string) => Promise<void>
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketProvider = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketProvider must be used within a SocketProvider');
  }
  return context;
};
