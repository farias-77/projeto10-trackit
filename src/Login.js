import styled from "styled-components";
import axios from "axios";

import logo from "./assets/logo_trackit.png";

import UserContext from "./contexts/UserContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const {token, setToken} = useContext(UserContext);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function sendLogin(e){
        e.preventDefault();
        
        const userLogin = {
            email,
            password,
        }

        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", userLogin);
        promise.then(validLogin);
        promise.catch(invalidLogin);
    }

    function invalidLogin(){
        setEmail("");
        setPassword("");
        alert("Login inválido!");
    }

    function validLogin(){
        alert("yessir");
        //rota /hoje
    }

    return (
        <Container>
            <img src={logo} alt="logo trackit" />
            <form onSubmit={sendLogin}>
                <input onChange={e => setEmail(e.target.value)} type="email" placeholder="email" value={email} required/>
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="senha" value={password} required/>
                <button type="submit">Entrar</button>
            </form>
            <Link to="/cadastro" ><p>Não tem uma conta? Cadastre-se!</p></Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    p{
        color: #52B6FF;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
    }

    form {
        display: flex;
        flex-direction: column;

        width: 303px;

        input{
            background-color: #ffffff;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            height: 45px;
            margin-bottom: 5px;
            padding-left: 11px;
        
            ::placeholder{
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #DBDBDB;
            }
        }

        button{
            border: none;
            width: 303px;
            height: 45px;
            margin-bottom: 25px;
            
            background-color: #52B6FF;
            border-radius: 5px;

            font-weight: 400;
            font-size: 20.976px;
            line-height: 26px;
            text-align: center;
            color: #ffffff;
        }
    }

    img{
        width: 240px;
        margin-top: 68px;
        margin-bottom: 30px;
    }
`;