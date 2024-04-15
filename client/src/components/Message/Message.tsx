import {MessageType} from "../../types";
import {useConversationStore, useCurrentUserStore} from "../../store";
import {DateTime} from "luxon";

const Message = ({message}: { message: MessageType }) => {
    const {currentUser} = useCurrentUserStore()
    const {selectedConversation} = useConversationStore();
    const fromMe = message.sender === currentUser?.id;
    const formattedTime = DateTime.fromISO(message.updatedAt).toLocaleString(DateTime.TIME_SIMPLE);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? currentUser?.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic}/>
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};
export default Message;