export default function WeatherCards({ weekData, viewFlg }) {
  return (
    <div className="weather-infos">
      {weekData.map((day, index) => {
        return (
          <div key={index} className="weather-info">
            <dt className="date">
              {index === 0 ? "今日" : index === 1 ? "明日" : day.date + "曜日"}
            </dt>
            {/* <dt>天気:</dt> */}
            <dd className="weather">
              {viewFlg ? (
                <span className={day.weather.toLowerCase()}>
                  {convertJapanWeth(day.weather)}
                </span>
              ) : (
                "お天気情報"
              )}
            </dd>
            {viewFlg && <img src={day.icon} alt="お天気アイコンです" />}
            <dt>降水確率:</dt>
            <dd className="pop">
              {viewFlg ? (
                <span className="popstr">{(day.pop * 100).toFixed(0)}%</span>
              ) : (
                "降水確率"
              )}
            </dd>
            <dt>最高 / 最低</dt>
            <dd className="temp">
              {viewFlg ? (
                <>
                  <span className="maxtemp">{day.maxTemp}</span>
                  <span className="mintemp">{day.minTemp}</span>
                </>
              ) : (
                "気温情報"
              )}
            </dd>
            <dt>湿度:</dt>
            <dd className="humidity">
              {viewFlg ? (
                <span className="humnum">{day.humidity}%</span>
              ) : (
                "湿度"
              )}
            </dd>
            {/* <dt>地域:</dt>
            <dd className="area">{viewFlg ? day.date : "調査場所名"}</dd> */}
          </div>
        );
      })}
    </div>
  );
}
