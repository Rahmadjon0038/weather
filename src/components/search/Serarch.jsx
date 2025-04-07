import React, { useState } from 'react'
import { Container, Input, Icons } from './style'
import { useWeather } from '../context/WeatherContext';

function Serarch() {
  const [inputValue, setINputValue] = useState('')
  const { city, setCity } = useWeather();
  const getCity = () => {
    let newCiyt = city.trim();
    if (newCiyt) {
      localStorage.setItem('city', inputValue)
      setCity(inputValue)
      setINputValue('')
    }
  }


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let newCiyt = city.trim();
      if (newCiyt) {
        localStorage.setItem('city', inputValue)
        setCity(inputValue)
        setINputValue('')
      }
    }
  }

  return (
    <Container>
      <Input onKeyDown={handleKeyDown} value={inputValue} onChange={(e) => setINputValue(e.target.value)} type="text" placeholder='Search' />
      <Icons onClick={getCity}><i className="fa-solid fa-magnifying-glass"></i></Icons>
    </Container>
  )
}

export default Serarch
