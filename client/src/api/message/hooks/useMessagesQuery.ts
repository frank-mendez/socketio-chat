import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {MessageDetailsTypes} from "../../../types";
import {AxiosError} from "axios";
import {getMessages} from "../services/messsage.service.ts";

export const useMessagesQuery = (id: number, options?: UseQueryOptions<MessageDetailsTypes, Error, MessageDetailsTypes>) => {
    return useQuery<MessageDetailsTypes, AxiosError>({
        queryKey: ['messages', id],
        queryFn: () => getMessages(id),
        ...options,
    });
}