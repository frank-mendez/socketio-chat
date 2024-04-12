import {axios} from "../../lib";
import {User} from "../../../types";

export const getUsers = async (): Promise<User[]> => {
    return axios.get('/api/users').then((res) => res.data);
}