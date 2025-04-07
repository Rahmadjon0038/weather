import React from 'react';
import { useWeeklyForecast } from '../../utils/server';

function Week() {
    const { data, isLoading, error } = useWeeklyForecast();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const dailyWeather = data?.list?.map((item) => {
        const date = new Date(item.dt * 1000);
        const temperature = item.main.temp;
        const description = item.weather[0].description;

        return {
            date: date.toLocaleDateString(),
            temperature,
            description
        };
    });

    return (
        <div>
            <h1>Weekly Weather Forecast</h1>
            <div>
                {dailyWeather?.map((weather, index) => (
                    <div key={index}>
                        <h3>{weather.date}</h3>
                        <p>Temperature: {weather.temperature}°C</p>
                        <p>Weather: {weather.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Week;
