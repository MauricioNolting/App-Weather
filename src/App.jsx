import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { WeatherContainer } from './components/WeatherContainer'
 

function App() {
const [weather, setWeather] = useState(null)


const [city, setCity] = useState("") 


{/* <img src={"/nubes-pantalla-de-carga"} alt="" /> */}

const success = (pos) => {
  console.log(pos)
     const lat = pos.coords.latitude
     const lon = pos.coords.longitude
     const APY_KEY = "4702f8dc6b97e507ec5d53623bb1f55a"
     
     axios
     .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APY_KEY}`
     )
     .then(({data}) => setWeather(data))
     .catch((err) => console.log(err))
}

useEffect(() => {
  if (city !== "") {
    const API_KEY = "4702f8dc6b97e507ec5d53623bb1f55a";
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(({ data }) => setWeather(data))
      .catch((error) => console.log("Error al obtener datos de la API:", error));
  }
}, [city]);





useEffect(() => {
   navigator.geolocation.getCurrentPosition(success)
}, [])

  return (
    
    <main className="font-['lato'] flex justify-center items-center min-h-screen text-white bg-cover relative" style={{backgroundImage: `url("/fondos/${weather?.weather[0].icon}.jpg")` }}>
      <div className="dark:absolute dark:inset-0 dark:bg-black dark:opacity-30"></div> {/* Fondo negro semi-transparente */}
      {weather === null ? (
        <div className="font-lato flex flex-col justify-center items-center min-h-screen text-white p-2 bg-slate-950 bg-cover relative">
          <h1 className='text-white'>WEATHER APP</h1>
          <img className='bg-cover animate-pulse' src="/nubes-pantalla-de-carga.png" alt="pantalla de carga" />
          <h3 className='animate-pulse'>Cargando...</h3>
        </div>
      ) : (
        <WeatherContainer  weather={weather} setCity={setCity} city={city}/>
      )}
    </main>
  
);
  
  
}

export default App
