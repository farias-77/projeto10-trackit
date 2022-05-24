import "./assets/css/reset.css";
import "./assets/css/shared.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

import UserContext from "./contexts/UserContext";

export default function App(){
    
    const [token, setToken] = useState("gabigol");
    
    return (
        <UserContext.Provider value={{token, setToken}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>   
    )
}