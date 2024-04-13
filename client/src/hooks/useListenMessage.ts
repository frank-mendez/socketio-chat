import {useSocketContext} from "../context/SocketContext.tsx";
import {useMessageStore} from "../store";
import {useEffect} from "react";
import notificationSound from "../assets/sounds/notification.mp3";

export const useListenMessage = () => {
    const {socket} = useSocketContext()
    const {messages, setMessages} = useMessageStore()

    useEffect(() => {
        socket?.on('newMessage', (message) => {
            message.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, message])
        })

        return () => {
            socket?.off('message')
        }
    }, [socket, setMessages, messages]);
}

