import Alert from "./components/Alert"
import Description from "./components/Description"
import Form from "./components/Form"
import Spinner from "./components/Spinner/Spinner"
import useWeather from "./hooks/useWeather"

function App() {

  const {fetchWeather, weather, hasWeatherData,loading,notFound} = useWeather()

  return (
    <>
      <div className="max-w-7xl mx-3 xl:mx-auto flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between items-center mt-7">
        <h1 className="text-white text-center text-4xl font-bold">Buscador de clima</h1>
        <Form
          fetchWeather={fetchWeather}
        />
      </div>

      <div>
        {loading && <Spinner/>}
        {hasWeatherData && <Description weather = {weather}/>}
        {notFound && <>
          <div className="bg-white p-2 mt-5 max-w-2xl mx-auto rounded-3xl">
          <Alert>
            <p className="text-4xl font-bold text-center">weather not found</p>
          </Alert>
          </div>
        </>}
      </div>
    </>
  )
}

export default App
