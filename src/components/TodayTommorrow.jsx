import rainyIcon from "../assets/rainy.png";
import uviIcon from "../assets/uvi.png";
import { useState, useEffect } from "react";
import "./TodayTommorrow.css";
export default function TodayTommorrow({
  ttData,
  todaysData,
  viewFlg,
  hourlyData,
  convertJapanWeth,
}) {
  if (!hourlyData || hourlyData.length == 0) {
    return <div>データ読込中...</div>;
  }
  // 1で降水アラート, 2でUVアラートとする
  const [alertFlg, setAlertFlg] = useState(0);
  const [alertData, setAlertData] = useState(null);
  const [alertPopHour, setAlertPopHour] = useState(0);
  // 本日時系列データと明日時系列データ用（スライド式）
  const todayData = hourlyData.slice(0, 24 - new Date().getHours());
  const tommorrowData = hourlyData.slice(24 - new Date().getHours(), 24);

  console.log(todayData);
  function checkPopAlert(todayData) {
    const targetObj = todayData.find(({ pop }) => pop >= 0.5);
    if (!targetObj) return undefined;
    const targetHour = new Date(targetObj?.dt * 1000).getHours();
    return { targetHour, targetObj };
  }
  // todayDataを捜査してアラートをチェックする
  // const alertData = checkPopAlert(todayData);
  // if (alertData) setAlertFlg(1);
  useEffect(() => {
    if (!hourlyData || hourlyData.length === 0) return;
    const alertData = checkPopAlert(todayData);
    if (alertData) {
      setAlertFlg(1);
    } else {
      setAlertFlg(0);
    }
  }, [hourlyData]);

  console.log(ttData);
  const today = ttData.today;
  console.log(today);
  const tommorrow = ttData.tommorrow;
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  function getUVLevel(uvi) {
    if (uvi >= 11)
      return {
        level: "極危険",
        advice: "外出は控えめに。必ず長袖・帽子・日焼け止めを",
        items: ["🧴日焼け止め", "👕長袖", "👒帽子", "🕶️サングラス", "🌂日傘"],
        color: "#9c27b0",
        bgColor: "#9c27b0",
      };
    if (uvi >= 8)
      return {
        level: "危険",
        advice: "日中の外出は注意。日陰を利用しよう",
        items: ["🧴日焼け止め", "👕長袖", "👒帽子", "🕶️サングラス"],
        color: "#f44336",
        bgColor: "#f44336",
      };
    if (uvi >= 6)
      return {
        level: "強",
        advice: "日焼け対策をしっかりと",
        items: ["🧴日焼け止め", "👒帽子", "🕶️サングラス"],
        color: "#ff9800",
        bgColor: "#ff9800",
      };
    if (uvi >= 3)
      return {
        level: "中",
        advice: "軽い日焼け対策を推奨",
        items: ["🧴日焼け止め", "👒帽子"],
        color: "#ffeb3b",
        bgColor: "#ffeb3b",
      };
    return {
      level: "弱",
      advice: "安心して外出できます",
      items: [],
      color: "#4caf50",
      bgColor: "#4caf50",
    };
  }
  return (
    <>
      {/* 週間表示モード */}
      {viewFlg === 1 && (
        <>
          <div className="weather-container">
            <div className="weather-card">
              <div className="weather-tt-header">
                <h3>今日の天気({today.date})</h3>
              </div>
              <p className={today.weather.toLowerCase()}>
                {convertJapanWeth(today.weather)}
              </p>

              <div className="weather-icon-section">
                <div className="weather-icon">
                  {/* この天気アイコンは大きめにしたい */}
                  <img src={today.icon} alt="本日の予報アイコン" />
                </div>
                <div className="weather-description">
                  <div className="temperature">
                    <p className="high-temp">
                      最高 <span>{`${today.maxTemp.toFixed(1)}℃`}</span>{" "}
                    </p>
                    <p className="low-temp">
                      最低 <span>{`${today.minTemp.toFixed(1)}℃`}</span>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <table className="precipitation-table">
                <thead>
                  <tr>
                    <th scope="col">時間</th>
                    <th scope="col">午前</th>
                    <th scope="col">午後</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="label">
                      <img
                        className="rainyimg"
                        src={rainyIcon}
                        alt="降水確率"
                      />
                    </td>
                    <td>
                      {today.popAM1 === "-"
                        ? "-"
                        : (today.popAM1 * 100).toFixed(0)}
                      %
                    </td>
                    <td>{(today.popPM1 * 100).toFixed(0)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="weather-card">
              <div className="weather-tt-header">
                <h3>明日の天気({tommorrow.date})</h3>
              </div>

              <div className="weather-icon-section">
                <p className={tommorrow.weather.toLowerCase()}>
                  {convertJapanWeth(tommorrow.weather)}
                </p>
                <div className="weather-icon">
                  {/* この天気アイコンは大きめにしたい */}
                  <img src={tommorrow.icon} alt="明日の予報アイコン" />
                </div>
                <div className="weather-description">
                  <div className="temperature">
                    <p className="high-temp">
                      最高 <span>{`${tommorrow.maxTemp.toFixed(1)}℃`}</span>{" "}
                    </p>
                    <p className="low-temp">
                      最低 <span>{`${tommorrow.minTemp.toFixed(1)}℃`}</span>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <table className="precipitation-table">
                <thead>
                  <tr>
                    <th scope="col">時間</th>
                    <th scope="col">午前</th>
                    <th scope="col">午後</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="label">
                      <img
                        className="rainyimg"
                        src={rainyIcon}
                        alt="降水確率"
                      />
                    </td>
                    <td>{(tommorrow.popAM2 * 100).toFixed(0)}%</td>
                    <td>{(tommorrow.popPM2 * 100).toFixed(0)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {/* デイリー表示モード_お天気カード部分 */}
      {viewFlg === 2 && (
        <>
          <div className="weather-today-container">
            <div className="weather-today-card">
              <div className="weather-today-header">
                <h3>今日の天気({today.date})</h3>
              </div>
              <p className={today.weather.toLowerCase()}>
                {convertJapanWeth(today.weather)}
                {` (${today.description}) `}
              </p>

              <div className="weather-today-icon-section">
                <div className="weather-today-icon">
                  {/* この天気アイコンは大きめにしたい */}
                  <img src={today.icon} alt="本日の予報アイコン" />
                </div>
                <div className="weather-today-description">
                  <div className="today-temperature">
                    <p className="today-high-temp">
                      最高 <span>{`${today.maxTemp.toFixed(1)}℃`}</span>{" "}
                    </p>
                    <p className="today-low-temp">
                      最低 <span>{`${today.minTemp.toFixed(1)}℃`}</span>{" "}
                    </p>
                  </div>
                </div>
              </div>

              <table className="today-precipitation-table">
                <thead>
                  <tr>
                    <th scope="col">時間</th>
                    <th scope="col">0-6</th>
                    <th scope="col">6-12</th>
                    <th scope="col">12-18</th>
                    <th scope="col">18-24</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="label">
                      <img
                        className="rainyimg"
                        src={rainyIcon}
                        alt="降水確率"
                      />
                    </td>
                    {/* <td>{(today.popAM1 * 100).toFixed(0)}%</td> */}
                    <td>
                      {todaysData.pop.AM1pop === "-"
                        ? "-"
                        : (todaysData.pop.AM1pop * 100).toFixed(0)}
                      %
                    </td>
                    <td>
                      {todaysData.pop.AM2pop === "-"
                        ? "-"
                        : (todaysData.pop.AM2pop * 100).toFixed(0)}
                      %
                    </td>
                    <td>
                      {todaysData.pop.PM1pop === "-"
                        ? "-"
                        : (todaysData.pop.PM1pop * 100).toFixed(0)}
                      %
                    </td>
                    <td>
                      {todaysData.pop.PM2pop === "-"
                        ? "-"
                        : (todaysData.pop.PM2pop * 100).toFixed(0)}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="label">
                      <img className="uviImg" src={uviIcon} alt="紫外線指数" />
                    </td>
                    <td>
                      {todaysData.uvi.AM1uvi === "-"
                        ? "-"
                        : todaysData.uvi.AM1uvi.toFixed(1)}
                      {todaysData.uvi.AM1uvi === "-" ? (
                        <p>-</p>
                      ) : (
                        <p
                          style={{
                            color: getUVLevel(todaysData.uvi.AM1uvi.toFixed(1))
                              .color,
                          }}
                        >
                          {getUVLevel(todaysData.uvi.AM1uvi.toFixed(1)).level}
                        </p>
                      )}
                    </td>
                    <td>
                      {todaysData.uvi.AM2uvi === "-"
                        ? "-"
                        : todaysData.uvi.AM2uvi.toFixed(1)}
                      {todaysData.uvi.AM2uvi === "-" ? (
                        <p>-</p>
                      ) : (
                        <p
                          style={{
                            color: getUVLevel(todaysData.uvi.AM2uvi.toFixed(1))
                              .color,
                          }}
                        >
                          {getUVLevel(todaysData.uvi.AM2uvi.toFixed(1)).level}
                        </p>
                      )}
                    </td>
                    <td>
                      {todaysData.uvi.PM1uvi === "-"
                        ? "-"
                        : todaysData.uvi.PM1uvi.toFixed(1)}
                      {todaysData.uvi.PM1uvi === "-" ? (
                        "-"
                      ) : (
                        <p
                          style={{
                            color: getUVLevel(todaysData.uvi.PM1uvi.toFixed(1))
                              .color,
                          }}
                        >
                          {getUVLevel(todaysData.uvi.PM1uvi.toFixed(1)).level}
                        </p>
                      )}
                    </td>
                    <td>
                      {todaysData.uvi.PM2uvi === "-"
                        ? "-"
                        : todaysData.uvi.PM2uvi.toFixed(1)}
                      {todaysData.uvi.PM2uvi === "-" ? (
                        "-"
                      ) : (
                        <p
                          style={{
                            color: getUVLevel(todaysData.uvi.PM2uvi.toFixed(1))
                              .color,
                          }}
                        >
                          {getUVLevel(todaysData.uvi.PM2uvi.toFixed(1)).level}
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="alert">
                <div className="alertPop">
                  {alertFlg === 1 && alertData && (
                    <p>{`降水確率が高いです。${
                      alertData.targetHour
                    }時の予想降水確率は${(
                      alertData.targetObj?.pop * 100
                    ).toFixed(0)}%です。`}</p>
                  )}
                </div>
                {console.log(todaysData)}
                <div
                  className="alertUvi"
                  style={{
                    color: getUVLevel(
                      Math.max(
                        todaysData.uvi.PM1uvi,
                        todaysData.uvi.AM2uvi
                      ).toFixed(0)
                    ).color,
                    border: `1px solid ${
                      getUVLevel(
                        Math.max(
                          todaysData.uvi.PM1uvi,
                          todaysData.uvi.AM2uvi
                        ).toFixed(0)
                      ).color
                    }`,
                  }}
                >
                  {`
                  紫外線強度: ${
                    getUVLevel(
                      Math.max(
                        todaysData.uvi.PM1uvi,
                        todaysData.uvi.AM2uvi
                      ).toFixed(1)
                    ).level
                  }
                  ${
                    getUVLevel(
                      Math.max(
                        todaysData.uvi.PM1uvi,
                        todaysData.uvi.AM2uvi
                      ).toFixed(1)
                    ).advice
                  }
                  `}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* デイリー表示モード_時間ごと表示部分 */}
      {viewFlg === 2 && (
        <>
          <div className="daily_table">
            <ul>
              <li className="tt-date">
                <p>日</p>
              </li>
              <li className="time">
                <p>時</p>
              </li>
              <li className="weather">
                <p>天気</p>
              </li>
              <li className="pop">
                <p>降水</p>
              </li>
              <li className="temp">
                <p>気温</p>
              </li>
              <li className="wind">
                <p>風</p>
              </li>
            </ul>
            <div className="hourly_infos">
              <div className="hourly_content">
                <div className="day_header">
                  <div className="today_date">
                    <span>{`${
                      new Date(hourlyData[0].dt * 1000).getMonth() + 1
                    }/${new Date(hourlyData[0].dt * 1000).getDate()}(${
                      days[new Date(hourlyData[0].dt * 1000).getDay()]
                    })`}</span>
                  </div>
                </div>
                <div className="every_day">
                  {todayData.map((hour) => (
                    <ul key={hour.dt}>
                      <li className="time">
                        {new Date(hour.dt * 1000).getHours()}
                      </li>
                      <li className="weather">
                        <img
                          src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                          alt="今日のお天気アイコン"
                        />
                        {/* {hour.weather[0].main}</li> */}
                      </li>
                      <li className="pop">{(hour.pop * 100).toFixed(0)}%</li>
                      <li className="temp">
                        {(hour.temp - 273.15).toFixed(0)}℃
                      </li>
                      <li className="wind">{hour.wind_speed.toFixed(1)}m/s</li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className="hourly_content">
                <div className="day_header">
                  <div className="today_date">
                    <span>
                      {`${new Date(hourlyData[0].dt * 1000).getMonth() + 1}/${
                        new Date(hourlyData[0].dt * 1000).getDate() + 1
                      }(${
                        days[new Date(hourlyData[0].dt * 1000).getDay() + 1]
                      })`}
                    </span>
                  </div>
                </div>
                <div className="every_day">
                  {tommorrowData.map((hour) => (
                    <ul key={hour.dt}>
                      <li className="time">
                        {new Date(hour.dt * 1000).getHours()}
                      </li>
                      <li className="weather">
                        <img
                          src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                          alt="今日のお天気アイコン"
                        />
                        {/* {hour.weather[0].main} */}
                      </li>
                      <li className="pop">{(hour.pop * 100).toFixed(0)}%</li>
                      <li className="temp">
                        {(hour.temp - 273.15).toFixed(0)}℃
                      </li>
                      <li className="wind">{hour.wind_speed.toFixed(1)}m/s</li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
