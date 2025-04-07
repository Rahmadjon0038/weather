import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ebf8ff;
  color: #2d3748;
`;

const ErrorBox = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #e53e3e;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const Text = styled.p`
  margin-top: 1rem;
  color: #4a5568;
`;

const Image = styled.img`
  width: 8rem;
  height: 8rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #3182ce;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #2b6cb0;
  }
`;

const ErrorPage = () => {
  return (
    <Container>
      <ErrorBox>
        <Title>404</Title>
        <Subtitle>Davlat topilmadi</Subtitle>
        <Text>Iltimos, davlat nomini to‘g‘ri kiriting yoki qayta urinib ko‘ring.</Text>
        <Image src="https://cdn-icons-png.flaticon.com/512/4275/4275497.png" alt="Weather Not Found" />
      </ErrorBox>
    </Container>
  );
};

export default ErrorPage;
