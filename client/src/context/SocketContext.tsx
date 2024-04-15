import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useAuthContext} from "./AuthContext.tsx";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}

export const SocketContextProvider = ({children}: { children: ReactNode }) => {
    const context = useAuthContext()
    const authUser = context ? context.authUser : null;
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    useEffect(() => {
        if (authUser) {
            const client = io(import.meta.env.VITE_HOST_API, {
                transports: ['websocket'],
                query: {
                    userId: authUser.id
                }
            })
            setSocket(client)
            client.on('getOnlineUsers', (data) => {
                setOnlineUsers(data)
            })
            return () => {
                void client.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}