import {GenderEnum} from "../enums/gender.enum.ts";

export type AuthUserType = {
    access_token: string
    username: string
    fullName: string
    gender: GenderEnum
    profilePicture: string
    createdAt: string
    updatedAt: string
    id: number
}

export type LoginUserType = {
    username: string
    password: string
}