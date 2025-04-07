import { createContext, useContext, useState } from "react";

const Weathercontext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState('Namangan');
    return (
        <Weathercontext.Provider value={{ city, setCity }}>
            {children}
        </Weathercontext.Provider>
    )
}


export const useWeather = () => useContext(Weathercontext)