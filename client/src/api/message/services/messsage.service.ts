import {MessageDetailsTypes, SendMessageResponseType, SendMessageType} from "../../../types";
import {axios} from "../../lib";

export const getMessages = async (id: number): Promise<MessageDetailsTypes> => {
    return axios.get(`/api/messages/${id}`).then((res) => res.data);
}

export const sendMessage = async (data: SendMessageType): Promise<SendMessageResponseType> => {
    return axios.post('/api/messages/send', data).then((res) => res.data);
}