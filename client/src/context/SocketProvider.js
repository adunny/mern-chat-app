import { createContext } from "react";
import io from "socket.io-client";

export const socket = io.connect("http://localhost:3001");
const SocketContext = createContext(socket);

export const SocketProvider = SocketContext.Provider;
export default SocketContext;
