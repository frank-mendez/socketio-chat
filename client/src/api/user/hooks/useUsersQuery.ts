import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {User} from "../../../types";
import {getUsers} from "../services/user.service.ts";
import {AxiosError} from "axios";

export const useUsersQuery = (options?: UseQueryOptions<User, Error, User>) => {
    return useQuery<User[], AxiosError>({
        queryKey: ['users'],
        queryFn: getUsers,
        ...options,
    });
}