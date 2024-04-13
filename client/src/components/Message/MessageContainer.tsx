import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti";
import {useConversationStore, useCurrentUserStore} from "../../store";

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversationStore();
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? <NoChatSelected/> : (<>
                {/* Header */}
                <div className='bg-slate-500 px-4 py-2 mb-2 text-left'>
                    <span className='label-text'>To:</span> <span
                    className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                </div>

                <Messages/>
                <MessageInput/>
            </>)}

        </div>
    );
};

const NoChatSelected = () => {
    const {currentUser} = useCurrentUserStore();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div
                className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {currentUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>
    );
};

export default MessageContainer;