import styled from "styled-components";

const Wrapper = styled.div`
    background-image: url(${({ lightR }) => lightR});
    background-color:${(bgCol) => bgCol.bgCol == 'broken clouds' ? "rgba(0, 114, 152, 0.72)" : bgCol.bgCol == 'light rain' ? "rgb(5, 54, 91) " : ""};
    padding-top: 40px;
    min-height: 100vh;
    background-size: cover;
    padding-top: 100px;
    `
const Card = styled.div`
  padding: 20px;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: rgba(0, 43, 71, 0.5);
  text-align: center;
  max-width: 800px;
  border-top: 7px solid blue;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  h2{
    font-size: 48px;
  }
`;

const Temp = styled.h1`
  font-size: 48px;
  color: #ff6b6b;
`;

const Info = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: white;
  p{
    font-size: 20px;
    margin-top: 10px;
  }
`;

const Loading = styled.p`
  text-align: center;
  font-size: 18px;
  color: #007bff;
`;

const Error = styled.p`
  text-align: center;
  font-size: 18px;
  color: #d9534f;
`;
export {
  Card, Temp, Info, Loading, Error, Wrapper
}

