import React from 'react'
import { useGetdata } from '../../utils/server'
import { Card, Info, Temp, Wrapper } from './style';
import bgimg from '../../assets/yomgir.png'
import clouds from '../../assets/clouds.png'
import nclouds from '../../assets/nclouds.png'
import clearSky from '../../assets/clearSky.png'
import { useWeather } from '../../components/context/WeatherContext';
import Looader from '../../components/Looader';
import ErrorPage from '../../components/ErrorPage';
function Day() {
  const { city } = useWeather()
  const { data, isLoading, error } = useGetdata(city);
  if (isLoading) return (
    <Looader/>
  )
  if (error) return (
    <ErrorPage/>
  )

  const holat = data.weather[0].description
  return (
    <Wrapper bgCol={holat} lightR={holat == 'light rain' ? bgimg : holat == 'broken clouds' ? clouds : holat == 'overcast clouds' ? nclouds : holat == 'clear sky' ? clearSky : ''} className='wrap'>
      <Card >
        <h2>{data.name} ob-havosi</h2>
        <Temp>Harorat {localStorage.getItem('dayC')}°C</Temp>
        <h2>{holat}</h2>
        <Info>
          <p>🌬 Shamol: {data.wind.speed} m/s</p>
          <p>💧 Namlik: {data.main.humidity}%</p>
          <p>🔵 Bosim: {data.main.pressure} hPa</p>
        </Info>
      </Card>
    </Wrapper>
  )
}

export default Day
