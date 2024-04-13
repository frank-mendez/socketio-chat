import {User} from "./user.types.ts";

export type MessageDetailsTypes = {
    id: number
    createdAt: string
    updatedAt: string
    messages: MessageType[]
}

export type MessageType = {
    id: number
    sender: number
    receiver: number
    message: string
    createdAt: string
    updatedAt: string
    conversations: number[]
}

export type SendMessageType = {
    receiver: number
    message: string
}

export type SendMessageFormType = {
    message: string
}

export type SendMessageResponseType = {
    id: number
    conversations: Conversation[]
    sender: User
    receiver: User
    message: string
    createdAt: string
    updatedAt: string
}

export interface Conversation {
    id: number
    createdAt: string
    updatedAt: string
}