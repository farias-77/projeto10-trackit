import styled from "styled-components";
import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "./assets/logo_trackit.png";

export default function Register(){
    
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        image: "",
    })
    
    function sendRegister(e){
        e.preventDefault();
        
        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form);

        promise.then(() => {
            navigate("/");
        });

        promise.catch(() => {
            alert("Informações inválidas, por favor, verifique.");
        })
    }

    function handleForm(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    
    return (
        <Container>
            <img src={logo} alt="logo trackit" />
            <form onSubmit={sendRegister}>
                <input onChange={handleForm} type="email" name="email" placeholder="email" value={form.description} required/>
                <input onChange={handleForm} type="password" name="password" placeholder="senha" value={form.description} required/>
                <input onChange={handleForm} type="name" name="name" placeholder="nome" value={form.description} required/>
                <input onChange={handleForm} type="url" name="image" placeholder="foto" value={form.description} required/>
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/" ><p>Já tem uma conta? Faça login!</p></Link>
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