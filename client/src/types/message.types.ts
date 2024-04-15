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
    shouldShake: boolean
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
    sender: number
    receiver: number
    message: string
    createdAt: string
    updatedAt: string
    shouldShake: boolean
}

export interface Conversation {
    id: number
    createdAt: string
    updatedAt: string
}