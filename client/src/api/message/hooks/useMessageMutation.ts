import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {sendMessage} from "../services/messsage.service.ts";
import {SendMessageResponseType} from "../../../types";

export function useMessageMutation(options?: UseMutationOptions<SendMessageResponseType, Error, SendMessageResponseType>) {
    return useMutation({
        mutationFn: sendMessage,
        ...options,
    });
}