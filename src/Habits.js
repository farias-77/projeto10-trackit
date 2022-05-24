import UserContext from "./contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Habits(){

    const {userInfo, setUserInfo} = useContext(UserContext);
    const [habits, setHabits] = 

    console.log(userInfo);

    useEffect(() => {
        
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

    })


    return(
        <Container>
            <Header>
                <p>Meus hábitos</p>
                <button>+</button>
            </Header>

        </Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    margin-bottom: 100px;
    padding-top: 22px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px;

    p{
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    button{
        border: none;
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 4.63636px;

        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }
`;