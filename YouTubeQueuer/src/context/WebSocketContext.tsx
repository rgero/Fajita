import { ReactElement, createContext } from "react";

import io from 'socket.io-client';

const socket = io('http://localhost:8000', {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": "*"  // Match the origin allowed by Flask-SocketIO
    }
});

export const SocketContext = createContext(socket);

interface ISocketProvider {
  children: ReactElement;
}

export const SocketProvider = (props: ISocketProvider) => (
  <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
);