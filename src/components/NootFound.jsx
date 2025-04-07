import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7fafc;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #f56565;
`;

const Message = styled.p`
  font-size: 1.25rem;
  margin-top: 1rem;
`;

const ReturnLink = styled(Link)`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  color: #3182ce;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;
const NootFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Kechirasiz, bu sahifa topilmadi!</Message>
      <ReturnLink to="/">Bosh sahifaga qaytish</ReturnLink>
    </NotFoundContainer>
  );
};

export default NootFound;
