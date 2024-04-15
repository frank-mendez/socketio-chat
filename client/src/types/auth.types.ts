import {GenderEnum} from "../enums/gender.enum.ts";

export type AuthUserType = {
    access_token: string
    username: string
    fullName: string
    id: number
    profilePicture: string
}

export type LoginUserType = {
    username: string
    password: string
}

export type UserSignupType = {
    username: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: GenderEnum;
}