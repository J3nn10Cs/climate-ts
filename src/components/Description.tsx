import { Weather } from '../hooks/useWeather'
import { formatTemperature } from '../utils'
import climate from '/img/climate.png'

type DescriptionWeatherProps = {
  weather : Weather
}

export default function Description({weather} : DescriptionWeatherProps) {
  return (
    <>
      <div className="max-w-xl mx-3 md:mx-auto bg-slate-950 p-10 my-9 rounded-3xl">
        <div className=' flex bg-white rounded-2xl p-3 flex-col lg:flex-row justify-between'>
          <img 
            className='h-24 md:h-32 mt-0 md:mt-8 mx-auto lg:mx-0'
            src={climate}
            alt="climate.png"
          />

          <div className='p-4'>
            <h2 className='text-4xl font-bold text-center'>Climate of : {weather.name}</h2>
            <p className='text-5xl font-black mt-3 text-center'>{formatTemperature(weather.main.temp)} &deg;C</p>
            <div className='flex justify-between'>
              <p className='text-xl mt-3 font-black'>Max : <span className='font-normal'> {formatTemperature(weather.main.temp_max)} &deg;C </span></p>
              <p className='text-xl mt-3 font-black'>Min : <span className='font-normal'> {formatTemperature(weather.main.temp_min)} &deg;C </span></p>
            </div>
            
          </div>
          
        </div>
      </div>
    </>
  )
}
