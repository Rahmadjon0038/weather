import styled from "styled-components";

const Container = styled.div`
    position: relative;
    width: 40%;
    display: flex;
    align-items: center;
    margin-top: 5px;


    @media (max-width: 768px) {
        display: none;
    }
  
`

const Input = styled.input`
    width: 100;
    width: 100%;
    padding: 10px 10px;   
    outline: none ;
    border-radius: 20px;
    border: none;
    `
const Icons = styled.span`
    position: absolute;
    font-size: 20px;
    right: 10px;
`

export {
    Input,
    Container,
    Icons
}