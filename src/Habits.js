import UserContext from "./contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import trashcan from "./assets/trashcan.png";

export default function Habits(){

    const {userInfo, setUserInfo} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [habitCreation, setHabitCreation] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");
    const [newHabitWeekdays, setNewHabitWeekdays] = useState([]);
    const [weekdays, setWeekdays] = useState([false,false,false,false,false,false,false,]);
    const [aux, setAux] = useState(false);
    const habitsDisplay = showHabits();

    useEffect(() => {
        
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`,
            }
        }
        

        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response) => {
            setHabits([...response.data]);
            setAux(true);
        });

        promise.catch(() => {
            console.log("deu ruim");
        })
    })

    useEffect(() => {
        showHabits();
    }, [aux]);

    function toggleWeekday(dayIndex){       
        if(weekdays[dayIndex] === false){
            setWeekdays(weekdays.map((day,index) => 
                index === dayIndex ? true : day
            ));
        }else{
            setWeekdays(weekdays.map((day,index) => 
                index === dayIndex ? false : day
            ));
        }
        
        
    }

    function chooseBackground(dayIndex){
        if(weekdays[dayIndex] === false){
            return "#ffffff";
        }else{
            return "#cfcfcf";
        }
    }

    function chooseFontColor(dayIndex){
        if(weekdays[dayIndex] === false){
            return "#DBDBDB";
        }else{
            return "#ffffff";
        }
    }

    function saveHabit(){
        let habitDays = weekdays.map((day, index) => day ? index : null).filter(day => day !== null);
        
        const habit = {
            name: newHabitName,
            days: habitDays,
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`,
            }
        }

        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habit, config);

        promise.then(() => {alert("foi")});
        promise.catch(() => {alert("num foi")});
    }

    function createHabit(){
        return(
            <HabitSetup>
                <input onChange={e => setNewHabitName(e.target.value)}placeholder="nome do hábito" />
                <Weekdays>
                    <Weekday onClick={() => toggleWeekday(0)} background={() => chooseBackground(0)} color={() => chooseFontColor(0)}>D</Weekday>
                    <Weekday onClick={() => toggleWeekday(1)} background={() => chooseBackground(1)} color={() => chooseFontColor(1)}>S</Weekday>
                    <Weekday onClick={() => toggleWeekday(2)} background={() => chooseBackground(2)} color={() => chooseFontColor(2)}>T</Weekday>
                    <Weekday onClick={() => toggleWeekday(3)} background={() => chooseBackground(3)} color={() => chooseFontColor(3)}>Q</Weekday>
                    <Weekday onClick={() => toggleWeekday(4)} background={() => chooseBackground(4)} color={() => chooseFontColor(4)}>Q</Weekday>
                    <Weekday onClick={() => toggleWeekday(5)} background={() => chooseBackground(5)} color={() => chooseFontColor(5)}>S</Weekday>
                    <Weekday onClick={() => toggleWeekday(6)} background={() => chooseBackground(6)} color={() => chooseFontColor(6)}>S</Weekday>
                </Weekdays>
                <Buttons>
                    <button onClick={() => setHabitCreation(false)}>Cancelar</button>
                    <button onClick={saveHabit}>Salvar</button>
                </Buttons>
            </HabitSetup>
        )

    }

    function showHabits(){        
        return (
            <HabitsContainer>
            {habits.map((habit) =>
                    <Habit key={habit.id}>
                        <p>{habit.name}</p>
                        <Weekdays>
                            <Weekday background={() => paintWeekday(0, habit)} color={() => paintFont(0, habit)}>D</Weekday>
                            <Weekday background={() => paintWeekday(1, habit)} color={() => paintFont(1, habit)}>S</Weekday>
                            <Weekday background={() => paintWeekday(2, habit)} color={() => paintFont(2, habit)}>T</Weekday>
                            <Weekday background={() => paintWeekday(3, habit)} color={() => paintFont(3, habit)}>Q</Weekday>
                            <Weekday background={() => paintWeekday(4, habit)} color={() => paintFont(4, habit)}>Q</Weekday>
                            <Weekday background={() => paintWeekday(5, habit)} color={() => paintFont(5, habit)}>S</Weekday>
                            <Weekday background={() => paintWeekday(6, habit)} color={() => paintFont(6, habit)}>S</Weekday>
                        </Weekdays>
                        <img src={trashcan} alt="excluir" />
                    </Habit>
            )}
            </HabitsContainer>
        )
    }

    function paintWeekday(dayNumber, habit){
        
        if(habit.days.includes(dayNumber)){
            return "#cfcfcf";
        }else{
            return "#ffffff";
        }
    }

    function paintFont(dayNumber, habit){
        
        if(habit.days.includes(dayNumber)){
            return "#ffffff";
        }else{
            return "#dbdbdb";
        }
    }

    return(
        <Container>
            <Header>
                <p>Meus hábitos</p>
                <button onClick={() => setHabitCreation(true)}>+</button>
            </Header>
            {habitCreation ? createHabit() : <></>}
            {aux ? showHabits() : <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
        </Container>
    )
}

const Habit = styled.div`
    width: 340px;
    height: 91px;
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    padding: 0 15px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    img{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 14px;
    }
`

const HabitsContainer = styled.div`
    width: 100%;
    padding: 0 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    
    button:first-child{
        border: none;
        background-color: #ffffff;
        
        width: 84px;
        height: 35px;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:last-child{
        border: none;
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.7px;

        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-left: 10px;
    }

`

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
        color: black;
        padding-left: 10px;
        margin-bottom: 5px;
    }

    
`;

const Weekdays = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 234px;
    margin-top: 10px;
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