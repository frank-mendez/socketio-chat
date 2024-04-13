import {createContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useAuthContext} from "./AuthContext.tsx";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({children}) => {
    const {authUser} = useAuthContext()
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    useEffect(() => {
        if (authUser) {
            const socket = io(import.meta.env.VITE_HOST_API, {
                transports: ['websocket'],
            })
            socket.on('connect', () => {
                socket.emit('events', authUser.id)
            })
        }
    }, [authUser]);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}