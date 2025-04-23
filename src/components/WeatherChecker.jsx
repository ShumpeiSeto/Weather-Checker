import { useState, useEffect } from "react";
import "./WeatherChecker.css";
import WeatherCards from "./WeatherCards";
import WeatherChart from "./WeatherChart";
import WeatherHeader from "./WeatherHeader";
import { setsEqual } from "chart.js/helpers";
// 天気を日本語に変える
const convertJapanWeth = (engtemp) => {
  if (engtemp === "Clear") return "晴れ";
  else if (engtemp === "Rain") return "雨";
  else if (engtemp === "Clouds") return "くもり";
  else return "雪";
};
const fetchWeatherData = async () => {
  // お天気API取得のための変数
  const API_KEY = "c80c3b32e313fbc3c6f358e4c6717881";
  const here = {};

  // 現在地取得する
  function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    here.lat = lat;
    here.lon = lon;
  }
  function fail(error) {
    window.alert("位置情報の取得に失敗しましたエラー:", error.code);
  }
  navigator.geolocation.getCurrentPosition(success, fail);

  const excludes = "current,minutely,hourly,alerts";
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

  const [viewMode, setViewMode] = useState(0);

  function weekClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(true);
  }
  function dailyClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(true);
  }
  function resetClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(false);
  }
  // Kelvinから気温に変換する
  function convertToTemp(kelvin) {
    return +(kelvin - 273.15).toFixed(1);
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
          color: "gray",
          anchor: "end",
          align: "20px",
          format: (value) => {
            return value + "%";
          },
        },
      },
    ],
  };
  return (
    <>
      <WeatherHeader
        weekClick={weekClick}
        dailyClick={dailyClick}
        resetClick={resetClick}
        viewMode={viewMode}
      />
      <WeatherCards
        weekData={weekData}
        viewFlg={viewFlg}
        convertJapanWeth={convertJapanWeth}
      />
      <WeatherChart data={data} icons={icons} viewFlg={viewFlg} />
      {console.log(data)}
    </>
  );
}
