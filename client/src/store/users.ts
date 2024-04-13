import {User} from "../types";
import {devtools, persist} from "zustand/middleware";
import {create} from "zustand";

type CurrentUserType = {
    currentUser: User | null;
}

type Action = {
    setCurrentUser: (user: User) => void
}

export const useCurrentUserStore = create<CurrentUserType & Action>()(
    devtools(
        persist((set) => ({
                currentUser: null,
                setCurrentUser: (user: User) => set({currentUser: user})
            }), {name: 'currentUserStore'}
        )
    ))