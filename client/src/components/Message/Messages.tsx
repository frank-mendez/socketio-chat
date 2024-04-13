import Message from "./Message";
import {useMessagesQuery} from "../../api";
import {User} from "../../types";
import {useRef} from "react";
import MessageSkeleton from "./MessageSkeleton.tsx";

const Messages = ({user}: { user: User }) => {
    const {data, isPending, isError} = useMessagesQuery(user.id);
    console.log('data', data)
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!isPending && data &&
                data.messages.length > 0 &&
                data.messages.map((message) => (
                    <div key={message.id}>
                        <Message message={message}/>
                    </div>
                ))}

            {isPending && [...Array(3)].map((_, idx) => <div key={idx}><MessageSkeleton/></div>)}
            {!isPending && !data && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;