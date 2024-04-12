import {createContext, useContext, useEffect, useState} from "react";
import {AuthUserType} from "../types";
import {GenderEnum} from "../enums/gender.enum.ts";


export const AuthContext = createContext<AuthUserType | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;

}

export const AuthContextProvider = ({children}) => {
    const chatUser = localStorage.getItem('chat-user');
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

    useEffect(() => {
        console.log('chatUser', chatUser)
        if (chatUser) {
            setAuthUser(JSON.parse(chatUser));
        }
    }, [chatUser]);

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}