import {createContext, useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useAuthContext} from "./AuthContext.tsx";

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
            return () => client.close();
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