import { SocketContext } from "../context/WebSocketContext";
import { useContext } from "react";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};