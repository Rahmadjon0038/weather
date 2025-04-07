import styled from "styled-components";
const Container = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:linear-gradient(rgba(0, 22, 41, 0.7),transparent);
    backdrop-filter:blur(8px);
    padding: 10px 30px;
    h1{
        display: flex;
        align-items: center;
        gap: 20px;
        color: white;
        cursor: pointer;
    }
`
const Img = styled.img`
    width: 50px;
`
const Nav = styled.div`
    display: flex;
    gap: 30px;
    .link{
        color: white;
        text-decoration: none;
        font-size: 18px;
        border: 1px solid white;
        padding: 5px 20px;
        border-radius: 4px;
    }
    .link1{
        color: white;
        text-decoration: none;
        font-size: 18px;
        border: 1px solid white;
        padding: 5px 20px;
        border-radius: 4px;
        background-color: blue;
    }
`
export {
    Container,
    Img,
    Nav,
};