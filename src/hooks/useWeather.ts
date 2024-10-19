import axios from "axios";
import { SearchType } from "../types";

export default function useWeather(){
  const fetchWeather = async (search : SearchType) => {

    const {city,country} = search
    const apiKey = import.meta.env.VITE_API_KEY
    try {
        const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`

        //{} -> para que solo nos traiga la data
        const {data} = await axios(geoUrl)
        console.log(data);

        const lat = data[0].lat
        const lon = data[0].lat

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        const {data : weatherResult } = await axios(weatherUrl)
        console.log(weatherResult);
    } catch (error) {
      console.log(error);
    }
  }

  return{
    fetchWeather
  }
}