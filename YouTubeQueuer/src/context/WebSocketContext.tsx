import { ReactElement, createContext } from "react";

import { getCurrentUser } from "../services/apiAuthentication";
import io from 'socket.io-client';

interface ISocketProvider {
  children: ReactElement;
}

const user = await getCurrentUser();

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": `${import.meta.env.VITE_BACKEND_URL}`, // Match the origin allowed by Flask-SocketIO
        "user_id": user.id.toString()
    }
});

export const SocketContext = createContext(socket);
export const SocketProvider = (props: ISocketProvider) => (
  <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
);