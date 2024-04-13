import {BsSend} from "react-icons/bs";
import {User} from "../../types";
import {useForm} from "react-hook-form";
import {SendMessageFormType} from "../../types/message.types.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {MessageSchema} from "../../validations/MessageSchema.ts";
import {useMessageMutation} from "../../api";
import {useMessageStore} from "../../store";

const MessageInput = ({user}: { user: User }) => {

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<SendMessageFormType>({
        defaultValues: {
            message: ''
        },
        resolver: yupResolver(MessageSchema)
    })
    const {messages, setMessages} = useMessageStore()
    const {mutateAsync: sendMessage, isPending, isError} = useMessageMutation({
        onSuccess: (data) => {
            console.log('data', data)
            setValue('message', '')
            setMessages([...messages, data])
        }
    })

    const handleSubmitMessage = handleSubmit(async (data) => {
        // await login(data)
        await sendMessage({receiver: user.id, message: data.message})
    })

    return (
        <form onSubmit={handleSubmitMessage} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    type='text'
                    className={`border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white ${errors.message ? 'border-red-500' : ''}`}
                    placeholder='Send a message'
                    {...register('message')}
                />
                {errors.message && <p className='text-error'>{errors.message.message}</p>}
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {isPending ? <div className='loading loading-spinner'></div> : <BsSend/>}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;