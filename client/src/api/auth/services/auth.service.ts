import {axios} from "../../lib";
import {LoginUserType, UserSignupType} from "../../../types";

export const signUp = async (data: UserSignupType): Promise<void> => {
    return axios.post('/api/auth/signup', data).then((res) => res.data);
}

export const login = async (data: LoginUserType): Promise<void> => {
    return axios.post('/api/auth/login', data).then((res) => res.data);
}