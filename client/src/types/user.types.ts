import {GenderEnum} from "../enums/gender.enum.ts";

export type User = {
    id: number
    username: string
    fullName: string
    gender: GenderEnum
    profilePicture: string
    createdAt: string
    updatedAt: string
}