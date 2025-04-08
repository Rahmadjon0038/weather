import React, { useState, useEffect } from "react";
import { useWeather } from "../../components/context/WeatherContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy } from "react-icons/wi";
import styled from "styled-components";
import { useGetdata } from "../../utils/server";

// Styled Components
const Container = styled.div`
margin-top: 100px;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const CityName = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const DateTime = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const CurrentWeather = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

const Temp = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1rem;
  opacity: 0.8;
`;

const ForecastSection = styled.div`
  margin-top: 2rem;
`;

const ForecastTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ForecastGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
`;

const ForecastCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${(props) =>
      props.weather === "Yengil yomg‘ir"
        ? "#60a5fa, #3b82f6"
        : props.weather === "Parçali bulutli"
        ? "#94a3b8, #64748b"
        : props.weather === "To‘liq bulutli"
        ? "#64748b, #475569"
        : props.weather === "Ochiq osmon"
        ? "#facc15, #f59e0b"
        : "#1f2937, #374151"}
  );
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  min-width: 150px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled(Link)`
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #2563eb;
  }
`;

function Home() {
  const { city } = useWeather();
  const { currentData, forecastData, isLoading, error } = useGetdata(city);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  // Hozirgi vaqtni yangilash
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 5 kunlik prognozni qayta ishlash
  useEffect(() => {
    if (forecastData && forecastData.list) {
      const dailyData = {};

      // Ma'lumotlarni kunlarga guruhlash
      forecastData.list.forEach((item) => {
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
          };
        }

        dailyData[day].temps.push(item.main.temp);
      });

      // Har bir kun uchun o‘rtacha haroratni hisoblash
      const forecast = Object.keys(dailyData).map((day) => {
        const temps = dailyData[day].temps;
        const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

        return {
          day: translateDay(day),
          avgTemp: avgTemp.toFixed(1),
          weather: translateWeather(dailyData[day].weather),
        };
      });

      // Faqat 5 kunlik ma'lumotni olish
      setWeeklyForecast(forecast.slice(0, 5));
    }
  }, [forecastData]);

  // Hafta kunlarini o‘zbek tiliga tarjima qilish
  const translateDay = (day) => {
    const daysInEnglish = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const daysInUzbek = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];
    const [weekday, rest] = day.split(", ");
    const dayIndex = daysInEnglish.indexOf(weekday);
    if (dayIndex !== -1) {
      return `${daysInUzbek[dayIndex]}, ${rest}`;
    }
    return day;
  };

  // Ob-havo holatlarini o‘zbek tiliga tarjima qilish
  const translateWeather = (weather) => {
    const weatherTranslations = {
      "light rain": "Yengil yomg‘ir",
      "broken clouds": "Parçali bulutli",
      "overcast clouds": "To‘liq bulutli",
      "clear sky": "Ochiq osmon",
    };
    return weatherTranslations[weather] || weather;
  };

  // Ob-havo holatiga qarab ikonka tanlash
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Yengil yomg‘ir":
        return <WiRain size={50} />;
      case "Parçali bulutli":
        return <WiDayCloudy size={50} />;
      case "To‘liq bulutli":
        return <WiCloudy size={50} />;
      case "Ochiq osmon":
        return <WiDaySunny size={50} />;
      default:
        return <WiDayCloudy size={50} />;
    }
  };

  // Agar ma'lumotlar hali yuklanmagan bo‘lsa yoki xatolik bo‘lsa
  if (isLoading) return <div className="text-white text-center">Ma'lumot yuklanmoqda...</div>;
  if (error) return <div className="text-red-500 text-center">Xatolik yuz berdi: {error.message}</div>;

  // Agar currentData undefined bo‘lsa, foydalanuvchiga xabar ko‘rsatamiz
  if (!currentData) {
    return <div className="text-white text-center">Ob-havo ma'lumotlari topilmadi.</div>;
  }

  const holat = translateWeather(currentData.weather?.[0]?.description || "Noma'lum");
  const formattedDate = currentTime.toLocaleDateString("uz-UZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("uz-UZ");

  return (
    <Container>
      <Header>
        <CityName>{currentData.name || "Shahar nomi topilmadi"}</CityName>
        <DateTime>
          {formattedDate}, {formattedTime}
        </DateTime>
      </Header>

      <CurrentWeather
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">{getWeatherIcon(holat)}</div>
        <Temp>{currentData.main?.temp || "Noma'lum"}°C</Temp>
        <h3 className="text-xl capitalize">{holat}</h3>
        <WeatherInfo>
          <p>🌬 Shamol: {currentData.wind?.speed || "Noma'lum"} m/s</p>
          <p>💧 Namlik: {currentData.main?.humidity || "Noma'lum"}%</p>
          <p>🔵 Bosim: {currentData.main?.pressure || "Noma'lum"} hPa</p>
        </WeatherInfo>
        <div className="mt-2">
          <p>Quyosh chiqishi: {currentData.sys?.sunrise ? new Date(currentData.sys.sunrise * 1000).toLocaleTimeString("uz-UZ") : "Noma'lum"}</p>
          <p>Quyosh botishi: {currentData.sys?.sunset ? new Date(currentData.sys.sunset * 1000).toLocaleTimeString("uz-UZ") : "Noma'lum"}</p>
        </div>
      </CurrentWeather>

      <ForecastSection>
        <ForecastTitle>5 kunlik prognoz (Qisqacha)</ForecastTitle>
        <ForecastGrid>
          {weeklyForecast.length > 0 ? (
            weeklyForecast.map((dayData, index) => (
              <ForecastCard
                key={index}
                weather={dayData.weather}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-sm font-semibold">{dayData.day}</h3>
                <div className="flex justify-center my-1">{getWeatherIcon(dayData.weather)}</div>
                <p className="text-lg font-bold">{dayData.avgTemp}°C</p>
                <p className="text-xs">{dayData.weather}</p>
              </ForecastCard>
            ))
          ) : (
            <p className="text-center">Prognoz ma'lumotlari topilmadi.</p>
          )}
        </ForecastGrid>
      </ForecastSection>

      <Buttons>
        <Button to="/day">Hozirgi ob-havo</Button>
        <Button to="/week">5 kunlik prognoz</Button>
      </Buttons>
    </Container>
  );
}

export default Home;