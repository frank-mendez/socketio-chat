import {GenderEnum} from "../enums/gender.enum.ts";

export type UserSignupType = {
    username: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: GenderEnum;

}