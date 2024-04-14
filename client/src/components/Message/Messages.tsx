import Message from "./Message";
import {useMessagesQuery} from "../../api";
import {User} from "../../types";
import {useEffect, useRef} from "react";
import MessageSkeleton from "./MessageSkeleton.tsx";
import {useMessageStore} from "../../store";
import {useListenMessage} from "../../hooks";

const Messages = ({user}: { user: User }) => {
    const {data, isPending} = useMessagesQuery(user.id);
    const {messages, setMessages} = useMessageStore()
    const lastMessageRef = useRef();

    // listen for new messages
    useListenMessage();

    useEffect(() => {
        if (data && data.messages.length > 0) {
            setMessages(data.messages) // set messages to store
        } else {
            setMessages([])
        }

    }, [data]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behavior: "smooth"}); // scroll to last message
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!isPending &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message.id} ref={lastMessageRef}>
                        <Message message={message}/>
                    </div>
                ))}

            {isPending && [...Array(3)].map((_, idx) => <div key={idx}><MessageSkeleton/></div>)}
            {!isPending && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;