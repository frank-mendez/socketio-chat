import {User} from "../types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    selectedConversation: User | null
}

type Action = {
    setSelectedConversation: (user: User) => void
}

export const useConversationStore = create<State & Action>()(
    devtools(
        (set) => ({
            selectedConversation: null,
            setSelectedConversation: (user: User) => set({selectedConversation: user})
        })
    ))