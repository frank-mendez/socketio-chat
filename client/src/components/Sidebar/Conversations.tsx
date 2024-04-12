import Conversation from "./Conversation";
import {useUsersQuery} from "../../api";
import {User} from "../../types";

const Conversations = () => {
    const {data, isPending, isError} = useUsersQuery({});
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {isPending ? <span className='loading loading-spinner mx-auto'></span> : null}
            {isError && <p>Error</p>}
            {data && data.map((user: User) => (
                <div key={user.id}>
                    <Conversation user={user}/>
                </div>
            ))}
        </div>
    );
};
export default Conversations;