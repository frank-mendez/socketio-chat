import {createContext, useContext, useEffect, useState} from "react";
import {AuthUserType} from "../types";
import {useNavigate} from "react-router-dom";
import {isValidToken, setSession} from "../utils";


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
    const navigate = useNavigate()
    useEffect(() => {
        if (chatUser) {
            setAuthUser(JSON.parse(chatUser));
        }
    }, [chatUser]);

    useEffect(() => {
        if (authUser) {
            localStorage.setItem('chat-user', JSON.stringify(authUser));
            const {access_token} = authUser;
            if (access_token && isValidToken(access_token)) {
                setSession(access_token);
            }
            navigate('/')
        } else {
            localStorage.removeItem('chat-user');
            navigate('/login')
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}