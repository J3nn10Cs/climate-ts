import Description from "./components/Description"
import Form from "./components/Form"
import useWeather from "./hooks/useWeather"

function App() {

  const {fetchWeather} = useWeather()

  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center mt-7">
        <h1 className="text-white text-center text-4xl font-bold">Buscador de clima</h1>
        <Form
          fetchWeather={fetchWeather}
        />
      </div>

      <div className="lg:grid lg:grid-cols-3">
        <Description/>
      </div>
    </>
  )
}

export default App
