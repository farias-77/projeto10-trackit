import styled from "styled-components";
import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import logo from "./assets/logo_trackit.png";

export default function Register(){
    
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState("Cadastrar");
    const [buttonOpacity, setButtonOpacity] = useState(1);
    const [inputBackground, setInputBackground] = useState("#ffffff");
    const [inputFontColor, setInputFontColor] = useState("black");
    const [isDisabled, setIsDisabled] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        image: "",
    })
    
    function sendRegister(e){
        e.preventDefault();
        
        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form);
        setLoading();

        promise.then(() => {
            navigate("/");
        });

        promise.catch(() => {
            alert("Informações inválidas, por favor, verifique.");
            setBackLoading();   
        })
    }

    function handleForm(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    
    function setLoading(){
        setButtonText(<ThreeDots color="white" />);
        setButtonOpacity(0.6);
        setInputBackground("#f2f2f2");
        setInputFontColor("#AFAFAF");
        setIsDisabled(true);
    }

    function setBackLoading(){
        setButtonText("Cadastrar");
        setButtonOpacity(1);
        setInputBackground("#ffffff");
        setInputFontColor("black");
        setIsDisabled(false);
    }

    return (
        <Container opacity={buttonOpacity} inputBackground={inputBackground} inputFontColor={inputFontColor}>
            <img src={logo} alt="logo trackit" />
            <form onSubmit={sendRegister}>
                <input onChange={handleForm} disabled={isDisabled} type="email" name="email" placeholder="email" value={form.description} required/>
                <input onChange={handleForm} disabled={isDisabled} type="password" name="password" placeholder="senha" value={form.description} required/>
                <input onChange={handleForm} disabled={isDisabled} type="name" name="name" placeholder="nome" value={form.description} required/>
                <input onChange={handleForm} disabled={isDisabled} type="url" name="image" placeholder="foto" value={form.description} required/>
                <button type="submit">{buttonText}</button>
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

    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;

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
            background-color: ${props => props.inputBackground};
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            height: 45px;
            margin-bottom: 5px;
            padding-left: 11px;
            
            font-weight: 400;
            font-size: 19.976px;
            color: ${props => props.inputFontColor};

            ::placeholder{
                font-weight: 400;
                font-size: 19.976px;
                line-height: 25px;
                color: #dbdbdb;
            }
        }

        button{
            border: none;
            width: 303px;
            height: 45px;
            margin-bottom: 25px;
            
            background-color: rgba(82, 182, 255, ${props => props.opacity});
            border-radius: 5px;

            font-weight: 400;
            font-size: 20.976px;
            line-height: 26px;
            text-align: center;
            color: #ffffff;

            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    img{
        width: 240px;
        margin-top: 68px;
        margin-bottom: 30px;
    }
`;