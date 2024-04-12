import './App.css'
import Home from "./pages/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";

function App() {

    return (
        <div className='p4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
            </Routes>
        </div>
    )
}

export default App
