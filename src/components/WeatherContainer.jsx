import { useEffect, useState } from "react"
import WeatherStat from "./WeatherStat"
import axios from "axios"

export const WeatherContainer = ({weather, setWeather}) => {

  const [isCelsius, setIsCelsius] = useState(true)
  const [theme, setTheme] = useState("light")
  const [city, setCity] = useState("")

  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const callCity = async () => {
    try {
      const API_KEY = "4702f8dc6b97e507ec5d53623bb1f55a";
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  };
  
  useEffect(() => {
    callCity(); // Llama a la función para obtener datos de la API cuando city cambie
  }, [city]);
  
    

  useEffect(() => {
    if (theme === "light") { 
      document.querySelector("html").classList.add("dark")
      } else {
        document.querySelector("html").classList.remove("dark")
      }

  }, [theme])
  
  const handleChangeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }


  const ChangeUnitiTemp = (temp) =>  {
    if (isCelsius) {
      // Transformacion a celsius
      const celsiusTemp = (temp - 273.15).toFixed(1)
      return `${celsiusTemp}°C`
      
    } else {
      //transformacion a farengheit
      const farenheitTemp = (((temp - 273.15) * 9/5) + 32).toFixed(1)
      return `${farenheitTemp}°F`
    }
  } 
   console.log(weather)


   const handleChangeUnitTemp = () => {
    setIsCelsius(!isCelsius)
   }

  //  Solicitar ciudad
   const handleInputCity = (e) => {
    setCity(e.taget.search.value)
   }
  
   console.log(city)


  //${weather[0].icon}.jpg
  return (
    
    <section className="text-center text-black dark:text-white">
      <button onClick={handleChangeTheme} className="
      w-[70px] h-5 bg-cover
      dark:hover:bg-yellow-100 
      dark:hover:text-black 
      dark:ease-in-out transition-all 
      duration-300 
      text-start
      dark:text-end
      px-3
      text-xs 
      rounded-[40%]
      border-[1px]
       bg-[#d7d7d770]
       text-gray-200
       dark:bg-[#ffffff39]
       hover:bg-slate-900
       absolute 
       top-2 right-2">🌞</button>
       
       <form onSubmit={handleInputCity} className="relative bottom-10">
       <input
        className="bg-slate-500/50 border-[2px] rounded-md"
        type="text"
        name="search"
        placeholder="Ingrese una ciudad"
        value={city} // Asignar el valor del input al estado de la ciudad
        onChange={handleInputCity} // Manejar cambios en el input
      />
        <button className="text-white bg-[#8f8a8a6e] border-[2px] rounded-md px-1 relative left-2" type="submit">Buscar</button>
       </form>
      
  
      <h3 className="dark:text-yellow-50 mx-auto text-white font-bold relative bottom-4 w-[201px] h-[29px] text-2xl">{weather?.name}, {weather?.sys.country}</h3>
    
      <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
        {/* seccion superior */}
        <article className="bg-slate-100/60 dark:bg-slate-950 dark:border-[2px]  rounded-2xl grid grid-cols-2 items-center p-3 w-[348px] h-[216px] sm:h-[300px] sm:w-[500px] ">
            <h4 className="col-span-2 capitalize"> {weather?.weather[0].description} </h4>
            <span className="dark:text-white text-5xl"> {ChangeUnitiTemp(weather?.main.temp)} </span>
            <picture> 
            {/* https://openweathermap.org/img/wn/10d@2x.png */}
              <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            </picture>
        </article>
        {/* seccion inferior */}
        <article className="dark:bg-slate-950 grid grid-cols-3 justify-items-center bg-slate-100/60 rounded-2xl p-2 py-3 sm:grid-cols-1 dark:border-[2px] ">
            <WeatherStat icon="./wind.png" unit="m/s" value={weather?.wind.speed}/>
            <WeatherStat icon="./humidity.png" unit="hPa" value={weather?.main.humidity}/>
            <WeatherStat icon="./pressure.png" unit="%" value={weather?.main.pressure}/>
        </article>
      </div>

      <button className="dark:bg-slate-950 dark:text-slate-50 dark:border-slate-200 w-[134px] h-[30px] rounded-[19px] text-[#4580BA] border-[1px] bg-white border-[#4580BA] relative top-3 hover:bg-[#0000007c] hover:text-slate-100 dark:hover:bg-[#0000007c] transition-all ease-in-out duration-300" onClick={handleChangeUnitTemp}>C / F</button>
    </section>
  )
}