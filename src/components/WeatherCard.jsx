export default function WeatherCard({
  currentData,
  day,
  index,
  convertJapanWeth,
}) {
  return (
    <div className={`weather-info item-${index}`} key={index}>
      <dt className="date">
        {index === 0 ? "今日" : index === 1 ? "明日" : day.date + "曜日"}
        {console.log(index)}
      </dt>
      <dd className="weather">
        <span className={day.weather.toLowerCase()}>
          {convertJapanWeth(day.weather)}
        </span>
      </dd>
      <img src={day.icon} alt="お天気アイコンです" />
      <dt>降水確率:</dt>
      <dd className="pop">
        <span className="popstr">{(day.pop * 100).toFixed(0)}%</span>
      </dd>
      <dt>最高 / 最低</dt>
      <dd className="temp">
        <span className="maxtemp">{day.maxTemp.toFixed(0)}°c</span>
        <span className="mintemp">{day.minTemp.toFixed(0)}°c</span>
      </dd>
      <dt>湿度:</dt>
      <dd className="humidity">
        <span className="humnum">{day.humidity}%</span>
      </dd>
    </div>
  );
}
