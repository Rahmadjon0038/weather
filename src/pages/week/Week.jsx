import React, { useState, useEffect } from "react";
import { useWeeklyForecast } from "../../utils/server";
import { motion } from "framer-motion"; // Animatsiya uchun framer-motion kutubxonasi
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy } from "react-icons/wi"; // Ob-havo ikonkalari uchun react-icons

// Styled Components
import styled from "styled-components";
import { useWeather } from "../../components/context/WeatherContext";

const Container = styled.div`
padding-top: 100px;
  background: linear-gradient(135deg, #091128, #3b82f6);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ForecastCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${(props) =>
        props.weather === "light rain"
            ? "#60a5fa, #3b82f6"
            : props.weather === "broken clouds"
                ? "#94a3b8, #64748b"
                : props.weather === "overcast clouds"
                    ? "#64748b, #475569"
                    : props.weather === "clear sky"
                        ? "#facc15, #f59e0b"
                        : "#1f2937, #374151"}
  );
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
`;

const DayText = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TempText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const WeatherText = styled.h3`
  font-size: 1rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

function Week() {
    const { city } = useWeather();
    const { data } = useWeeklyForecast(city);
    const [weeklyForecast, setWeeklyForecast] = useState([]);
    localStorage.setItem('dayC',weeklyForecast[0]?.avgTemp)

    useEffect(() => {
        if (data && data.list) {
            const dailyData = {};

            data.list.forEach((item) => {
                const date = new Date(item.dt * 1000); 
                const day = date.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                });

                if (!dailyData[day]) {
                    dailyData[day] = {
                        temps: [],
                        weather: item.weather[0].description,
                        wind: item.wind.speed,
                        humidity: item.main.humidity,
                        pressure: item.main.pressure,
                    };
                }

                dailyData[day].temps.push(item.main.temp);
            });

            const forecast = Object.keys(dailyData).map((day) => {
                const temps = dailyData[day].temps;
                const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

                return {
                    day,
                    avgTemp: avgTemp.toFixed(1),
                    weather: dailyData[day].weather,
                    wind: dailyData[day].wind,
                    humidity: dailyData[day].humidity,
                    pressure: dailyData[day].pressure,
                };
            });

            setWeeklyForecast(forecast.slice(0, 5));
        }
    }, [data]);

    if (!data) {
        return (
            <div className="text-white text-center">
                <h1>Ma'lumot yuklanmoqda...</h1>
            </div>
        );
    }

    // Ob-havo holatiga qarab ikonka tanlash
    const getWeatherIcon = (weather) => {
        switch (weather) {
            case "light rain":
                return <WiRain size={40} />;
            case "broken clouds":
                return <WiDayCloudy size={40} />;
            case "overcast clouds":
                return <WiCloudy size={40} />;
            case "clear sky":
                return <WiDaySunny size={40} />;
            default:
                return <WiDayCloudy size={40} />;
        }
    };

    return (
        <Container>
            <Title>{data?.city?.name} - 5 kunlik ob-havo prognozi</Title>
            <ForecastGrid>
                {weeklyForecast.map((dayData, index) => (
                    <ForecastCard
                        key={index}
                        weather={dayData.weather}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <DayText>{dayData.day}</DayText>
                        <div className="flex justify-center">{getWeatherIcon(dayData.weather)}</div>
                        <TempText>{dayData.avgTemp}°C</TempText>
                        <WeatherText>{dayData.weather}</WeatherText>
                        <InfoContainer>
                            <p>🌬 Shamol: {dayData.wind} m/s</p>
                            <p>💧 Namlik: {dayData.humidity}%</p>
                            <p>🔵 Bosim: {dayData.pressure} hPa</p>
                        </InfoContainer>
                    </ForecastCard>
                ))}
            </ForecastGrid>
        </Container>
    );
}

export default Week;