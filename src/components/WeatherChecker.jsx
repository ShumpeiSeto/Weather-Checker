import { useState, useEffect } from "react";
import "./WeatherChecker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Weather Chart",
    },
  },
};
const fetchWeatherData = async () => {
  // お天気API取得のための変数
  const API_KEY = "c80c3b32e313fbc3c6f358e4c6717881";
  const here = {
    lat: 35.472734,
    lon: 139.6296175,
  };
  const excludes = "current,minutely,hourly,alerts";
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${here.lat}&lon=${here.lon}&appid=${API_KEY}`;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${here.lat}&lon=${here.lon}&exludes=${excludes}&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${error}`
    );
  } else {
    // body部分をJSON形式と考えて、オブジェクト形式変える
    return await response.json();
  }
};
export default function WeatherChecker() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [viewFlg, setViewFlg] = useState(false);
  // chart用のデータ変数
  const dateLabels = [];
  const pops = [];
  const weathers = [];
  const humidities = [];
  const maxTemps = [];
  const minTemps = [];
  const icons = [];

  // Kelvinから気温に変換する
  function convertToTemp(kelvin) {
    return +(kelvin - 273.15).toFixed(2);
  }
  function handleClick() {
    setViewFlg(true);
  }
  function resetClick() {
    setViewFlg(false);
  }
  useEffect(() => {
    fetchWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  console.log(weatherData);
  // Loading中の表示
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{`データ取得エラー：${error.message}`}</div>;
  }
  const dailyData = weatherData.daily;
  console.log(dailyData);
  const weekData = dailyData.reduce((acc, day) => {
    const date = new Date(day.dt * 1000).toLocaleDateString("ja-JP", {
      weekday: "short",
    });
    const maxTemp = convertToTemp(day.temp.max);
    const minTemp = convertToTemp(day.temp.min);
    const weather = day.weather.at(0).main;
    const pop = day.pop;
    const humidity = day.humidity;
    const iconId = day.weather.at(0).icon;
    const icon = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

    // chart用のデータを格納する
    dateLabels.push(date);
    // weathers.push(weather);
    pops.push(pop * 100);
    // icons.push(icon);
    humidities.push(humidity);
    maxTemps.push(maxTemp);
    minTemps.push(minTemp);

    // 表示用のオブジェクトを作っておく
    let reuslt = {
      date,
      maxTemp,
      minTemp,
      weather,
      pop,
      humidity,
      icon,
    };
    acc.push(reuslt);
    return acc;
  }, []);
  const data = {
    labels: dateLabels,
    datasets: [
      // {
      //   label: "天気",
      //   data: weathers,
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
      {
        label: "降水確率",
        data: pops,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "気温(最高)",
        data: maxTemps,
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
      {
        label: "気温(最低)",
        data: minTemps,
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: "湿度",
        data: humidities,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
  return (
    <>
      <h2>お天気調べましょう！</h2>
      <button onClick={handleClick}>調べる</button>
      <button onClick={resetClick}>リセット</button>
      {weekData.map((day, index) => {
        return (
          <div key={index} className="weather-info">
            <dt>日付:</dt>
            <dd className="date">{viewFlg ? day.date : "日付表示場所"}</dd>
            <dt>天気:</dt>
            <dd className="weather">{viewFlg ? day.weather : "お天気情報"}</dd>
            {viewFlg && <img src={day.icon} alt="お天気アイコンです" />}
            <dt>降水確率:</dt>
            <dd className="pop">
              {viewFlg ? `${day.pop * 100}%` : "降水確率"}
            </dd>
            <dt>気温(最高/最低):</dt>
            <dd className="temp">
              {viewFlg ? `${day.maxTemp} ${day.minTemp}` : "気温情報"}
            </dd>
            <dt>湿度:</dt>
            <dd className="humidity">
              {viewFlg ? `${day.humidity}%` : "湿度"}
            </dd>
            {/* <dt>地域:</dt>
            <dd className="area">{viewFlg ? day.date : "調査場所名"}</dd> */}
          </div>
        );
      })}
      <Line height={500} width={700} options={options} data={data} />
      {console.log(data)}
    </>
  );
}
