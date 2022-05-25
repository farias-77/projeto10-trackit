import styled from "styled-components";
import UserContext from "./contexts/UserContext";
import { useContext } from "react";
import logo from "./assets/logo_interna.png";

export default function Header(){

    const { userInfo, setUserInfo} = useContext(UserContext);

    function showHeader(){
        if(userInfo.token !== ""){
            return (
            <Container>
                <img src={logo} alt="logo trackit" />
                <img src={userInfo.image} alt="user photo" />
            </Container>)
        }else{
            return (<></>)
        }
    }
    
    return (
        showHeader()
    )
}

const Container = styled.div`

    width: 100%;
    height: 70px;

    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    img:last-child{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        background: white;
        object-fit: cover;
    }
`;