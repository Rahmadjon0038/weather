import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(rgba(0, 22, 41, 0.7), transparent);
    backdrop-filter: blur(8px);
    padding: 10px 30px;

    @media (max-width: 768px) {
        padding: 10px 20px;
    }

    @media (max-width: 480px) {
        padding: 8px 15px;
    }

    h1 {
        display: flex;
        align-items: center;
        gap: 20px;
        color: white;
        cursor: pointer;
        font-size: 22px;

        @media (max-width: 480px) {
            font-size: 18px;
        }
    }
`;

const Img = styled.img`
    width: 50px;

    @media (max-width: 480px) {
        width: 40px;
    }
`;

const Nav = styled.div`
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
        gap: 15px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        display: none;
    }

    .link, .link1 {
        color: white;
        text-decoration: none;
        font-size: 18px;
        border: 1px solid white;
        padding: 5px 20px;
        border-radius: 4px;

        @media (max-width: 480px) {
            font-size: 16px;
            padding: 5px 15px;
        }
    }

    .link1 {
        background-color: blue;
    }
`;

export { Container, Img, Nav };
