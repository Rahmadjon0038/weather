import axios from "axios";
import { useQuery } from "react-query";

const API_KEY = "19aed87ec1f25ac55099a95326ccbee4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const useGetdata = (newCity='namangan') => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["weather", newCity], // queryKey’da newCity ishlatamiz
        queryFn: () =>
            axios
                .get(`${BASE_URL}?q=${newCity}&appid=${API_KEY}&units=metric`)
                .then((res) => res.data),
        enabled: !!newCity, // newCity bo‘sh bo‘lmasa so‘rov yuboriladi
        retry: 1, // Xato yuz bersa, 1 marta qayta urinib ko‘radi
    });

    return { data, isLoading, error, refetch };
};

const BASE_URL2 = "https://api.openweathermap.org/data/2.5/forecast"; 
export const useWeeklyForecast = (city) => {
    const validCity = city || "Namangan"; 
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["weeklyWeather", validCity],
        queryFn: () =>
            axios
                .get(`${BASE_URL2}?q=${validCity}&appid=${API_KEY}&units=metric`)
                .then((res) => res.data),
        enabled: !!validCity,
        retry: 1,
    });

    return { data, isLoading, error, refetch };
};
