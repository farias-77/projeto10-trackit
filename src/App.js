import "./assets/css/reset.css";
import "./assets/css/shared.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Habits from "./Habits";
import Header from "./Header";
import Footer from "./Footer";
import Today from "./Today";
import Records from "./Records";

import UserContext from "./contexts/UserContext";

export default function App(){
    
    const [userInfo, setUserInfo] = useState({
        email: "",
        id: "",
        image: "",
        name: "",
        password: "",
        token: "",
    });
    
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/habitos" element={<Habits />} /> 
                <Route path="/hoje" element={<Today />} />
                <Route path="/historico" element={<Records />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </UserContext.Provider>  
    )
}