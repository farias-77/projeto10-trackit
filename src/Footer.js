import styled from "styled-components"
import { Link } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { useContext } from "react";

export default function Footer(){
    
    const { userInfo, setUserInfo } = useContext(UserContext); 

    function showFooter(){
        if(userInfo.token !== ""){
            return (
                <Container>
                    <Link to="/habitos"><p>Hábitos</p></Link>
                    <Link to="/hoje"><p>Hoje</p></Link>
                    <Link to="/historico"><p>Histórico</p></Link>
                </Container>
            )
        }else{
            return (<></>)
        }
    }
    
    
    return (
        showFooter()
    )
}

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