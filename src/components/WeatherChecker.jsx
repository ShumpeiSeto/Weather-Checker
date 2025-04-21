import { useState, useEffect } from "react";
import "./WeatherChecker.css";
import WeatherCards from "./WeatherCards";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
// import { BsBorderWidth } from "react-icons/bs";
// import { MdBorderColor } from "react-icons/md";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
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
    datalabels: {
      color: "white",
      anchor: "end",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
      max: 25,
      min: 10,
      ticks: {
        stepSize: 3,
      },
    },
    y1: {
      stacked: false,
      position: "right",
      max: 100,
      min: 0,
      ticks: {
        color: "rgba(29, 186, 186, 0.5)",
      },
    },
  },
};
const convertJapanWeth = (engtemp) => {
  if (engtemp === "Clear") return "晴れ";
  else if (engtemp === "Rain") return "雨";
  else if (engtemp === "Clouds") return "くもり";
  else return "雪";
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
    icons.push(icon);
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
    // labels: icons,
    datasets: [
      // {
      //   label: "天気",
      //   data: weathers,
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
      // {
      //   label: "降水確率",
      //   data: pops,
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      //   borderColor: "rgba(53, 162, 235, 0.5)",
      //   // pointBackgroundColor: white,
      //   type: "bar",
      //   yAxisID: "y1",
      // },
      {
        type: "line",
        label: "気温(最高)",
        data: maxTemps,
        backgroundColor: "red",
        borderColor: "red",
        yAxisID: "y",
        datalabels: {
          color: "red",
          anchor: "start",
          align: "end",
        },
      },
      {
        type: "line",
        label: "気温(最低)",
        data: minTemps,
        backgroundColor: "blue",
        borderColor: "blue",
        yAxisID: "y",
        datalabels: {
          color: "blue",
          anchor: "end",
          align: "bottom",
        },
      },
      {
        type: "bar",
        label: "湿度",
        data: humidities,
        backgroundColor: "rgba(29, 186, 186, 0.5)",
        borderColor: "rgba(29, 186, 186, 0.5)",
        barThickness: 20,
        yAxisID: "y1",
        datalabels: {
          color: "white",
          anchor: "end",
          align: "center",
          format: (value) => {
            return value + "%";
          },
        },
      },
    ],
  };
  return (
    <>
      <h2>お天気調べましょう！</h2>
      <button onClick={handleClick}>調べる</button>
      <button onClick={resetClick}>リセット</button>
      <WeatherCards weekData={weekData} viewFlg={viewFlg} />
      <div className="weather">
        <Line height={150} width={300} options={options} data={data} />
        <div className="wicons">
          {icons.map((icon, index) => (
            <div key={index}>
              <img src={`${icon}`} alt="Weather icon" />
            </div>
          ))}
        </div>
      </div>
      {console.log(data)}
    </>
  );
}
