import DescrriptionDetails from './DescrriptionDetails'
import climate from '/img/climate.jpg'
export default function Description() {
  return (
    <>
      <div className="bg-slate-950 bg-opacity-75 p-10 md:col-span-2 m-4 rounded-3xl">
        <div className='flex flex-col lg:flex-row justify-between'>
          <img 
            className='h-36 w-32 mx-auto lg:mx-0'
            src={climate}
            alt="climate.jpg"
          />
          <DescrriptionDetails
            label='Madrid'
            description='España'
          />
          <DescrriptionDetails
            label='+20°'
            description='Temperature'
          />
          <DescrriptionDetails
            label='24%'
            description='Humedad'
          />
          <DescrriptionDetails
            label='13km/h'
            description='Wind speed'
          />
          <DescrriptionDetails
            label='Madrid'
            description='España'
          />
        </div>
      </div>
    </>
  )
}
