import UserContext from "./contexts/UserContext";
import dayjs from "dayjs";
import styled from "styled-components";
import axios from "axios";
import check from "./assets/check.png";
import { useState, useEffect, useContext } from "react";

export default function Today(){   
    const browserDate = new Date();      //retorna a data em formato definido pelo navegador(?)
    const weekdayIndex = browserDate.getDay();    //retorna o dia da semana (0-6)
    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const todayWeek = weekdays[weekdayIndex];
    const todayYear = dayjs(browserDate).format("DD/MM");  

    const { userInfo, donePerc, setDonePerc} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [doneHabits, setDoneHabits] = useState([]);
    const [aux, setAux] = useState(false);
    
    
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`,
            }
        }
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then((response) => {
            setHabits([...response.data]);
            setAux(true);
        });

    }, []);

    useEffect(() => {
        setDoneHabits(habits.filter(habit => habit.done === true));
    }, [habits]);

    useEffect(() => {
        setDonePerc((doneHabits.length/habits.length)*100);
    }, [doneHabits]);

    function checkHabit(habit){
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`,
            }
        }

        if(habit.done === true){
            let promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, null, config);
            promise.then(() => {
                habit.done = false;
                habit.currentSequence = habit.currentSequence - 1;
                setHabits([...habits]);
            })

        }else{
            let promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, null, config);
            promise.then(() => {
                habit.done = true;
                habit.currentSequence = habit.currentSequence + 1;
                setHabits([...habits]);
            })
        } 
    }

    function verifyRecord(habit){
        if(habit.currentSequence === habit.highestSequence && habit.currentSequence > 0){
            habit.highestSequence = habit.currentSequence;
            return "#8FC549";
        }else{
            return "#666666";
        }
    }

    function checkBackground(habit){
        if(habit.done === true){
            return "#8FC549";
        }else{
            return "#ebebeb";
        }
    }

    function checkTextColor(habit){
        if(habit.done === true){
            return "#8FC549";
        }else{
            return "#666666";
        }
    }

    return (
        <Container>
            <Day>{todayWeek}, {todayYear}</Day>
            <TodayStatus color={ donePerc > 0 ? "#8FC549" : "#BABABA"} >{ donePerc > 0 ? `${donePerc.toFixed(0)}% dos hábitos concluídos` : "Nenhum hábito concluído ainda" }</TodayStatus>            
            <HabitsContainer>
                {!aux ? "Loading..." : habits.map((habit, index) =>
                    <Habit key={index}>
                        <HabitInfo textColor={() => checkTextColor(habit)} recordColor={() => verifyRecord(habit)}>
                            <h4>{habit.name}</h4>
                            <p>Sequência atual: {habit.currentSequence} dia(s)</p>
                            <p>Seu recorde: {habit.highestSequence} dia(s)</p>
                        </HabitInfo>
                        <Check onClick ={()=>checkHabit(habit)} background={()=>checkBackground(habit)} ><img src={check} alt="check" /></Check>
                    </Habit>)}
            </HabitsContainer>            
        </Container>
    )
}

const Container = styled.div`
    margin-top: 70px;
    margin-bottom: 100px;
    
    width: 100%;
    height: 100%;
    padding: 0 15px;
    padding-top: 30px;
`;

const Day = styled.div`
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
`;

const TodayStatus = styled.div`
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${props => props.color};

    margin-bottom: 40px;
`;

const Habit = styled.div`
    width: 340px;
    height: 94px;
    background-color: #ffffff;
    padding: 15px;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
`;

const HabitInfo = styled.div`
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 400;
    color: #666666;
    h4{
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    
    p:nth-child(2){
        font-size: 12.976px;
        line-height: 16px;
        color: ${props => props.textColor};
    }
    
    p:last-child{
        font-size: 12.976px;
        line-height: 16px;
        color: ${props => props.recordColor};
    }
    
`;

const Check = styled.div`
    width: 69px;
    height: 69px;
    background-color: ${props => props.background};

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #E7E7E7;
    border-radius: 5px;

    img{
        width: 35px;
    }

    cursor: pointer;
`;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`