import './App.css'
import Home from "./pages/Home/Home.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useAuthContext} from "./context/AuthContext.tsx";

function App() {
    const queryClient = new QueryClient()
    const {authUser} = useAuthContext()
    return (
        <div className='p4 h-screen flex items-center justify-center'>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/>}/>
                        <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login/>}/>
                        <Route path='/signup' element={authUser ? <Navigate to='/'/> : <Signup/>}/>
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
