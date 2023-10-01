const WeatherStat = ({icon, value, unit}) => {
  return (
    <div className="flex gap-1 items-center dark:text-slate-50">
    <img src={icon} alt="" />
    <span className="dark:text-slate-50">{value}{unit}</span>
  </div>
  )
}
export default WeatherStat