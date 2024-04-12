import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {login, signUp} from "../services/auth.service.ts";

export function useSignupMutation(options?: UseMutationOptions<any, Error, any>) {
    return useMutation({
        mutationFn: signUp,
        ...options,
    });
}

export function useLoginMutation(options?: UseMutationOptions<any, Error, any>) {
    return useMutation({
        mutationFn: login,
        ...options,
    });
}