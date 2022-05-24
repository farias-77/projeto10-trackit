import styled from "styled-components";
import axios from "axios";

import logo from "./assets/logo_trackit.png";

import UserContext from "./contexts/UserContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {

    const {userInfo, setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("Entrar");
    const [buttonOpacity, setButtonOpacity] = useState(1);
    const [inputBackground, setInputBackground] = useState("#ffffff");
    const [inputFontColor, setInputFontColor] = useState("black");
    const [isDisabled, setIsDisabled] = useState(false);

    function sendLogin(e){
        e.preventDefault();
        
        const userLogin = {
            email,
            password,
        }

        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", userLogin);
        setButtonText(<ThreeDots color="white" />);
        setButtonOpacity(0.6);
        setInputBackground("#f2f2f2");
        setInputFontColor("#AFAFAF");
        setIsDisabled(true);

        promise.then((response) => {
            setUserInfo({...response.data})
            navigate("/hoje");
        });

        promise.catch(() => {
            setEmail("");
            setPassword("");
            setButtonText("Cadastrar");
            setButtonOpacity(1);
            setInputBackground("#ffffff");
            setInputFontColor("black");
            setIsDisabled(false);

            alert("Login inválido!");
        });
    }


    return (
        <Container opacity={buttonOpacity} inputBackground={inputBackground} inputFontColor={inputFontColor}>
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