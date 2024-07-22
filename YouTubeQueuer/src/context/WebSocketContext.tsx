import { createContext, useContext } from "react";

import io from 'socket.io-client';
import { useUser } from "../components/authentication/hooks/useUser";

const SocketContext = createContext(io());

const SocketProvider = ({children}: {children: React.ReactNode}) => {
  const {user} = useUser();
  const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": `${import.meta.env.VITE_BACKEND_URL}`, // Match the origin allowed by Flask-SocketIO
        "user_id": user ? user.id.toString() : ""
    }
});

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