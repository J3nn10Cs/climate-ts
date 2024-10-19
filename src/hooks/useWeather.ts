import axios from "axios";
// import {z} from 'zod'
import { SearchType } from "../types";
import { object, number, string, InferOutput, parse } from "valibot";
import { useMemo, useState } from "react";

  //Type GUARD O ASERTION -> no recomendada
  // function isWeatherResponse(weather : unknown) : weather is Weather{
  //   return(
  //     Boolean(weather) && 
  //     typeof weather === 'object' &&
  //     typeof (weather as Weather).name === 'string' &&
  //     typeof (weather as Weather).main.temp === 'number' &&
  //     typeof (weather as Weather).main.temp_max === 'number' &&
  //     typeof (weather as Weather).main.temp_min === 'number'
  //   )
  // }

  //ZOD
  // const Weather = z.object({
  //   name : z.string(),
  //   main: z.object({
  //     temp : z.number(),
  //     temp_max : z.number(),
  //     temp_min : z.number(),
  //   })
  // })

  //inferir en base al schema
  //type Weather = z.infer<typeof Weather>

  //VALIBOT
  const WeatherSchema = object({
    main : object({
      temp: number(),
      temp_max: number(),
      temp_min: number()
    }),
    name : string()
  })
  

  //inferir
  export type Weather = InferOutput<typeof WeatherSchema>

  const initialState = {
    name: '',
    main : {
      temp : 0,
      temp_max : 0,
      temp_min : 0,
    }
  }

export default function useWeather(){

  const [weather , setWeather] = useState<Weather>(initialState)

  //spinner
  const [loading, setLoading] = useState(false)

  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search : SearchType) => {

    const {city,country} = search
    const apiKey = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialState)
    try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`

        //{} -> para que solo nos traiga la data
        const {data} = await axios(geoUrl)
        // console.log(data);

        //comprobar si existe
        if(!data[0]){
          setNotFound(true);
          setTimeout(() => {
            setNotFound(false)
          }, 2000);
          return
        }

        const lat = data[0].lat
        // console.log(lat);
        const lon = data[0].lon

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        console.log(weatherUrl);

        //castear el type
        // const {data : weatherResult } = await axios(weatherUrl)
        // console.log(weatherResult);

        //type guard
        // const {data : weatherResult } = await axios(weatherUrl)
        // const result = isWeatherResponse (weatherResult)

        // if(result){
        //   console.log(weatherResult.name);
        // }else{
        //   console.log('Respuesta mal formateada');
        // }

        //zod
          //llamado a la api
        // const {data : weatherResult} = await axios(weatherUrl)
        // //toma el resultado y revisa las propiedades si corresponden al schema -> true o false
        // const result = Weather.safeParse(weatherResult)

        // if(result.success){
        //   console.log(result.data.name);
        //   console.log(result.data.main.temp);
        // }else{
        //   console.log('Respuesta mal formada');
        // }

        //VALIBOT
          //llamado a la API
        const {data : weatherResult} = await axios(weatherUrl)
        const result =  parse(WeatherSchema, weatherResult)
        // console.log(result);
        if(result){
          //result contiene todo nuestra peticion
          setWeather(result)
        }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  const hasWeatherData = useMemo(() => weather.name ,[weather])

  return{
    weather,
    fetchWeather,
    hasWeatherData,
    loading,
    notFound
  }
}