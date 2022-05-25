import UserContext from "./contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";

export default function Habits(){

    const {userInfo, setUserInfo} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [showHabitCreation, setShowHabitCreation] = useState(true);
    const habitsFunction = showHabits();
    const habitCreation = createHabit();

    useEffect(() => {
        
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`,
            }
        }
        

        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response) => {
            setHabits([...response.data])
        });

        promise.catch(() => {
            alert("deu ruim");
        })
    })

    function showHabits(){
        if(habits.length === 0){
            return(
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )
        }else{
            return (<>aqui tem um habito</>)
        }
    }

    function createHabit(){
        return(
            <HabitSetup>
                <input placeholder="nome do hábito" />
                <Weekdays>
                    <Weekday background="#ffffff" color="#DBDBDB">D</Weekday>
                    <Weekday background="#ffffff" color="#DBDBDB">S</Weekday>
                    <Weekday background="#ffffff" color="#DBDBDB">T</Weekday>
                    <Weekday background="#ffffff" color="#DBDBDB">Q</Weekday>
                    <Weekday background="#ffffff" color="#DBDBDB">Q</Weekday>
                    <Weekday background="#ffffff" color="#DBDBDB">S</Weekday>
                    <Weekday background="#ffffff" color="#DBDBDB">S</Weekday>
                </Weekdays>
                {/* <button>Cancelar</button>
                <button>Salvar</button> */}
            </HabitSetup>
        )

    }

    return(
        <Container>
            <Header>
                <p>Meus hábitos</p>
                <button onClick={habitCreation}>+</button>
            </Header>
            {habitCreation}
            {habitsFunction}
        </Container>
    )
}

const Container = styled.div`
    background-color: #f2f2f2;

    margin-top: 70px;
    margin-bottom: 100px;
    padding: 0 20px;
    padding-top: 22px;

    p{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

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

const HabitSetup = styled.div`
    width: 340px;
    height: 180px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 18px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;

    input{
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        padding-left: 10px;
        margin-bottom: 5px;
    }
`;

const Weekdays = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 234px;
    
`;

const Weekday = styled.div`
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${props => props.background};
    color: ${props => props.color};

    border: 1px solid #D5D5D5;
    border-radius: 5px;
`;