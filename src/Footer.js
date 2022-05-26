import styled from "styled-components"
import { Link } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer(){
    
    const { userInfo, donePerc} = useContext(UserContext); 

    function displayFooter(){
        if(userInfo.token !== ""){
            return (
                <Container>
                    <Link to="/habitos"><p>Hábitos</p></Link>
                    <Link to="/hoje"><ProgressBarWidth><CircularProgressbar value={donePerc} text="Hoje" background backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    /></ProgressBarWidth></Link>
                    <Link to="/historico"><p>Histórico</p></Link>
                    
                </Container>
            )
        }else{
            return (<></>)
        }
    }


    return (
        displayFooter()
    )
}

const ProgressBarWidth = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 40px;
`

const Container = styled.div`
    width: 100%;
    height: 70px;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;

    background-color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 35px;

    p{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF; 
    }
`;