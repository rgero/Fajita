import { createContext, useContext } from "react";

import { getCurrentUser } from "../services/apiAuthentication";
import io from 'socket.io-client';

const user = await getCurrentUser();
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": `${import.meta.env.VITE_BACKEND_URL}`, // Match the origin allowed by Flask-SocketIO
        "user_id": user ? user.id.toString() : ""
    }
});

const SocketContext = createContext(socket);

const SocketProvider = ({children}: {children: React.ReactNode}) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export {SocketProvider, useSocket};