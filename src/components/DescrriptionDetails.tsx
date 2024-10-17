
type DescrriptionDetailsProps = {
  label : string,
  description : string
}

export default function DescrriptionDetails({label,description} : DescrriptionDetailsProps) {
  return (
    <>
      <div className='text-white text-center'>
            <h2 className='text-5xl'>{label}</h2>
            <p className='text-xl mt-3'>{description}</p>
        </div>
    </>
  )
}
