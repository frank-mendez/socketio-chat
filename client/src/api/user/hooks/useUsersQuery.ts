import {useQuery} from "@tanstack/react-query";
import {User} from "../../../types";
import {getUsers} from "../services/user.service.ts";
import {AxiosError} from "axios";

export const useUsersQuery = () => {
    return useQuery<User[], AxiosError>({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}