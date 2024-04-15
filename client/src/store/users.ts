import {AuthUserType} from "../types";
import {devtools} from "zustand/middleware";
import {create} from "zustand";

type CurrentUserType = {
    currentUser: AuthUserType | null;
}

type Action = {
    setCurrentUser: (user: AuthUserType | null) => void
}

export const useCurrentUserStore = create<CurrentUserType & Action>()(
    devtools(
        (set) => ({
            currentUser: null,
            setCurrentUser: (user: AuthUserType) => set({currentUser: user})
        })
    ))