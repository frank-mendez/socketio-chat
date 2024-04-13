import {User} from "../../types";
import {useConversationStore} from "../../store";
import {useSocketContext} from "../../context/SocketContext.tsx";

const Conversation = ({user, lastIdx, emoji}: { user: User, lastIdx: number, emoji: string }) => {

    const {selectedConversation, setSelectedConversation} = useConversationStore();
    const isSelected = selectedConversation?.id === user.id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(user.id.toString());

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`} onClick={() => setSelectedConversation(user)}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className="w-12 rounded-full">
                        <img alt='Profile pic' src={user.profilePicture}/>
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{user.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
        </>
    );
};
export default Conversation;