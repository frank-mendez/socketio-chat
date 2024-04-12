import {UserSignupType} from "../../../types/user-signup.ts";
import {axios} from "../../lib";

export const signUp = async (data: UserSignupType): Promise<void> => {
    return axios.post('/auth/signup', data).then((res) => res.data);
}