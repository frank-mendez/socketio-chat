import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {sendMessage} from "../services/messsage.service.ts";
import {SendMessageResponseType, SendMessageType} from "../../../types";


export function useMessageMutation(options?: UseMutationOptions<SendMessageResponseType, Error, SendMessageType>) {
    return useMutation({
        mutationFn: sendMessage,
        ...options,
    });
}