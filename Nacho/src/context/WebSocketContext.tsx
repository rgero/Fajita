import { createContext, useContext } from "react";

import io from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_WEBSOCKET_URL}`, {
  withCredentials: true,
  extraHeaders: {
      "Access-Control-Allow-Origin": `${import.meta.env.VITE_WEBSOCKET_URL}`, // Match the origin allowed by Flask-SocketIO
  }
});

const SocketContext = createContext(socket);

const SocketProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
};

const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export {SocketProvider, useSocket};