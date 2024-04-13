import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {BrowserRouter} from "react-router-dom";
import {SocketContextProvider} from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <App/>
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
