import { useState } from 'react'
import searchs from '/svg/search.svg'
import { SearchType } from '../types'
import { countries } from '../data/countries'
import { ChangeEvent } from 'react'
import Alert from './Alert'

type FormProps = {
  fetchWeather: () => void
}

export default function Form({fetchWeather} : FormProps) {
    const [search,setSearch] = useState<SearchType>({
      city: '',
      country : ''
    })

    const [alert,setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setSearch({
        ...search,
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(Object.values(search).includes('')){
        setAlert('Todos los campos son obligatorios');
        setTimeout(() => {
          setAlert('')
        }, 2000);
        return
      }
      fetchWeather()
    }
  return (
    <>
      <form
        className='flex flex-col md:flex-row gap-5'
        onSubmit={handleSubmit}
      >
        {alert && 
          <Alert>{alert}</Alert>
        }
        <div className='flex bg-slate-950 bg-opacity-75 py-3 px-2 rounded-full gap-2'>
          <img src={searchs} alt="search.jpg" />
          <input
            className=' bg-slate-950 bg-opacity-5 w-full text-white'
            type="text"
            name="city"
            id="city"
            placeholder='Search city or postcode'
            value={search.city}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center bg-slate-950 bg-opacity-75 py-3 px-4 rounded-full gap-2'>
          <label
            htmlFor="country"
            className='text-white font-bold'
          >
            Pais:
          </label>
          <select
            id='country'
            name='country'
            className='bg-slate-950 bg-opacity-5 text-white p-1 text-center'
            value={search.country}
            onChange={handleChange}
          >
            <option
              value=""
              className='bg-slate-950'
            >
              --Selecciona un Pais--</option>
            {countries.map(country => (
              <option
                className='bg-slate-950'
                key={country.code}
                value={country.code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit"
          className='bg-slate-950 bg-opacity-75 rounded-full text-white py-3 px-4 font-bold text-center'
        >
          Consultar CLima
        </button>
      </form>
    </>
  )
}
