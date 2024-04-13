import {createContext, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {AuthContext, useAuthContext} from "./AuthContext.tsx";
import {AuthUserType} from "../types";

const SocketContext = createContext(null);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}

export const SocketContextProvider = ({children}) => {
    const {authUser} = useAuthContext()
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    useEffect(() => {
        if (authUser) {
            const socket = io(import.meta.env.VITE_HOST_API, {
                transports: ['websocket'],
                query: {
                    userId: authUser.id
                }
            })
            setSocket(socket)
            socket.on('getOnlineUsers', (data) => {
                console.log('data', data)
                setOnlineUsers(data)
            })
        }
    }, [authUser]);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}