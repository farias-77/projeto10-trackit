import styled from "styled-components";

export default function Records(){
    return (
        <Container>
            <p>Meus hábitos</p>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </Container>
    )
}

const Container = styled.div`
    background-color: #f2f2f2;

    margin-top: 70px;
    margin-bottom: 100px;
    padding: 0 20px;
    padding-top: 22px;

    p:first-child{
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;;
    }

    p:last-child{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;