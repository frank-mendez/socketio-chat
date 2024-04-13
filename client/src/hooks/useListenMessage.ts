import {useSocketContext} from "../context/SocketContext.tsx";
import {useMessageStore} from "../store";
import {useEffect} from "react";

export const useListenMessage = () => {
    const {socket} = useSocketContext()
    const {messages, setMessages} = useMessageStore()

    useEffect(() => {
        socket?.on('newMessage', (message) => {
            console.log('newMessage', message)
            console.log('messages', messages)
            setMessages([...messages, message])
        })

        return () => {
            socket?.off('message')
        }
    }, [socket, setMessages, messages]);
}

