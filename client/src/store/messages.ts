import {MessageType} from "../types";
import {create} from "zustand";
import {devtools} from "zustand/middleware";

type State = {
    messages: MessageType[]
    selectedMessage: MessageType | null
}

type Action = {
    setMessages: (messages: MessageType[]) => void
    setSelectedMessage: (message: MessageType) => void
}

export const useMessageStore = create<State & Action>()(
    devtools(
        (set) => ({
            messages: [],
            selectedMessage: null,
            setMessages: (messages: MessageType[]) => set({messages}),
            setSelectedMessage: (message: MessageType) => set({selectedMessage: message})
        })
    ))