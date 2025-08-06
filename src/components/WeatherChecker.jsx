import { useState, useEffect } from "react";
import "./WeatherChecker.css";
import WeatherCards from "./WeatherCards";
import WeatherChart from "./WeatherChart";
import WeatherHeader from "./WeatherHeader";
import TodayTommorrow from "./TodayTommorrow";
// 天気を日本語に変える
const convertJapanWeth = (engtemp) => {
  if (engtemp === "Clear") return "晴れ";
  else if (engtemp === "Rain") return "雨";
  else if (engtemp === "Clouds") return "くもり";
  else return "雪";
};
// Kelvinから気温に変換する
function convertToTemp(kelvin) {
  return +(kelvin - 273.15).toFixed(3);
}
function getWeekData(mydata) {
  if (!mydata) {
    return { weekData: [], chartData: {} };
  } else {
    const dateLabels = [];
    const pops = [];
    const humidities = [];
    const maxTemps = [];
    const minTemps = [];
    const icons = [];
    const weekData = mydata.reduce((acc, day) => {
      const date = new Date(day.dt * 1000).toLocaleDateString("ja-JP", {
        weekday: "short",
      });

      const maxTemp = convertToTemp(day.temp.max);
      const minTemp = convertToTemp(day.temp.min);
      const weather = day.weather.at(0).main;
      const description = day.weather.at(0).description;
      const pop = day.pop;
      const humidity = day.humidity;
      const iconId = day.weather.at(0).icon;
      const icon = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

      // chart用のデータを格納する
      dateLabels.push(date);
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
        description,
        pop,
        humidity,
        icon,
      };
      acc.push(reuslt);
      return acc;
    }, []);
    let chartData = {
      dateLabels,
      pops,
      icons,
      humidities,
      maxTemps,
      minTemps,
    };
    return { weekData, chartData };
  }
}

export default function WeatherChecker() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [current, setCurrent] = useState(null);
  const [viewFlg, setViewFlg] = useState(1);
  const [location, setLocation] = useState(null);
  const [viewMode, setViewMode] = useState("weekmode");

  function weekClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(1);
  }
  function dailyClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(2);
  }
  // function resetClick(selectedButton) {
  //   setViewMode(selectedButton);
  //   setViewFlg(false);
  // }
  // dtから日時に変換する
  function checkTTAmPm(dt) {
    let dateFromDt = new Date(dt * 1000);

    // 午前午後判別LINEをつくる
    let dateLine1 = new Date();
    let dateLine2 = new Date();
    let dateLine3 = new Date();
    let dateLine4 = new Date();
    dateLine1.setHours(12);
    dateLine1.setMinutes(0);
    dateLine1.setSeconds(0);
    dateLine2.setDate(dateLine2.getDate() + 1);
    dateLine2.setHours(0);
    dateLine2.setMinutes(0);
    dateLine2.setSeconds(0);
    dateLine3.setDate(dateLine3.getDate() + 1);
    dateLine3.setHours(12);
    dateLine3.setMinutes(0);
    dateLine3.setSeconds(0);
    dateLine4.setDate(dateLine4.getDate() + 2);
    dateLine4.setHours(0);
    dateLine4.setMinutes(0);
    dateLine4.setSeconds(0);
    if (dateFromDt <= dateLine1) return "AM1";
    else if (dateFromDt <= dateLine2) return "PM1";
    else if (dateFromDt <= dateLine3) return "AM2";
    else if (dateFromDt <= dateLine4) return "PM2";
    else return undefined;
  }

  function checkTOAmPm2(dt) {
    let dateFromDt = new Date(dt * 1000);

    // 午前1, 2午後1, 2判別LINEをつくる
    let dateLine1 = new Date();
    let dateLine2 = new Date();
    let dateLine3 = new Date();
    let dateLine4 = new Date();
    dateLine1.setHours(6);
    dateLine1.setMinutes(0);
    dateLine1.setSeconds(0);
    dateLine2.setDate(dateLine2.getDate());
    dateLine2.setHours(12);
    dateLine2.setMinutes(0);
    dateLine2.setSeconds(0);
    dateLine3.setDate(dateLine3.getDate());
    dateLine3.setHours(18);
    dateLine3.setMinutes(0);
    dateLine3.setSeconds(0);
    dateLine4.setDate(dateLine4.getDate());
    dateLine4.setHours(24);
    dateLine4.setMinutes(0);
    dateLine4.setSeconds(0);
    if (dateFromDt <= dateLine1) return "AM1";
    else if (dateFromDt <= dateLine2) return "AM2";
    else if (dateFromDt <= dateLine3) return "PM1";
    else if (dateFromDt <= dateLine4) return "PM2";
    else return undefined;
  }

  // お天気情報取得
  const fetchWeatherData = async (location) => {
    if (!location) {
      throw new Error("Location is not defined");
    }
    const API_KEY = "c80c3b32e313fbc3c6f358e4c6717881";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,alerts&appid=${API_KEY}&lang=ja`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${error}`
      );
    }
    return await response.json();
  };
  // console.log("現在地情報を取得します");
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("位置情報取得エラー");
        setIsLoading(false);
      },
      options
    );
  }, []);
  // 取得したデータを表示するためのuseEffect
  console.log(location);
  useEffect(() => {
    // debugger;
    if (location) {
      // setIsLoading(false);
      setError(null);
      fetchWeatherData(location)
        .then((data) => {
          console.log("Weather data fetched:", data);
          setWeatherData(data);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setError(err.message);
        })
        .finally(() => {
          console.log("Loading state set to false");
          setIsLoading(false);
        });
    }
  }, [location]);
  // ここは[location]としたいが、エラー多いため抜いておく

  // 取得データ確認 current, hourly, dailyプロパティがある
  console.log(weatherData);

  // 週間データの取得
  const weekData = weatherData?.daily;
  const hourlyData = weatherData?.hourly;
  console.log(hourlyData);

  // 週間データ用の今日明日お天気カード用オブジェクト作成
  const popForData = hourlyData?.reduce(
    (acc, { dt, pop }) => {
      if (hourlyData && checkTTAmPm(dt) === "AM1") {
        acc["AM1"].push(pop);
      } else if (hourlyData && checkTTAmPm(dt) === "PM1") {
        acc["PM1"].push(pop);
      } else if (hourlyData && checkTTAmPm(dt) === "AM2") {
        acc["AM2"].push(pop);
      } else if (hourlyData && checkTTAmPm(dt) === "PM2") {
        acc["PM2"].push(pop);
      }
      return acc;
    },
    {
      // ひとつめをpop値とする2つ目は合致するカウント値平均値のため
      AM1: [],
      PM1: [],
      AM2: [],
      PM2: [],
    }
  );
  const todayData = hourlyData?.reduce(
    (acc, { dt, pop, uvi }) => {
      if (hourlyData && checkTOAmPm2(dt) === "AM1") {
        acc["AM1pop"].push(pop);
        acc["AM1uvi"].push(uvi);
      } else if (hourlyData && checkTOAmPm2(dt) === "AM2") {
        acc["AM2pop"].push(pop);
        acc["AM2uvi"].push(uvi);
      } else if (hourlyData && checkTOAmPm2(dt) === "PM1") {
        acc["PM1pop"].push(pop);
        acc["PM1uvi"].push(uvi);
      } else if (hourlyData && checkTOAmPm2(dt) === "PM2") {
        acc["PM2pop"].push(pop);
        acc["PM2uvi"].push(uvi);
      }
      return acc;
    },
    {
      // ひとつめをpop値とする2つ目は合致するカウント値平均値のため
      AM1pop: [],
      AM1uvi: [],
      AM2pop: [],
      AM2uvi: [],
      PM1pop: [],
      PM1uvi: [],
      PM2pop: [],
      PM2uvi: [],
    }
  );
  console.log(todayData);
  // 週間データ用今日明日降水確率表示のためのオブジェクト作成
  const popAve = popForData
    ? {
        AM1: Math.max(...popForData["AM1"]) || 0,
        PM1: Math.max(...popForData["PM1"]) || 0,
        AM2: Math.max(...popForData["AM2"]) || 0,
        PM2: Math.max(...popForData["PM2"]) || 0,
      }
    : undefined;
  // 本日データ用本日カードのためのオブジェクト作成（降水確率とUVI）
  const todaysData = todayData
    ? {
        pop: {
          AM1pop: Math.max(...todayData["AM1pop"]) || 0,
          AM2pop: Math.max(...todayData["AM2pop"]) || 0,
          PM1pop: Math.max(...todayData["PM1pop"]) || 0,
          PM2pop: Math.max(...todayData["PM2pop"]) || 0,
        },
        uvi: {
          AM1uvi: Math.max(...todayData["AM1uvi"]) || 0,
          AM2uvi: Math.max(...todayData["AM2uvi"]) || 0,
          PM1uvi: Math.max(...todayData["PM1uvi"]) || 0,
          PM2uvi: Math.max(...todayData["PM2uvi"]) || 0,
        },
      }
    : undefined;

  console.log(todaysData);
  const { weekData: allWeekData, chartData } = getWeekData(weekData);
  const ttData = { today: allWeekData[0], tommorrow: allWeekData[1] };
  console.log(ttData);

  if (ttData.today) {
    ttData.today["popAM1"] = popAve?.AM1;
    // 過去時間データを修正（-Infinity-> "-")
    if (!Number.isFinite(ttData.today["popAM1"])) ttData.today["popAM1"] = "-";
    ttData.today["popPM1"] = popAve?.PM1;
    ttData.tommorrow["popAM2"] = popAve?.AM2;
    ttData.tommorrow["popPM2"] = popAve?.PM2;
  }
  if (todaysData) {
    // 過去時間データを修正（-Infinity-> "-")
    if (!Number.isFinite(todaysData?.pop.AM1pop)) todaysData.pop.AM1pop = "-";
    if (!Number.isFinite(todaysData?.uvi.AM1uvi)) todaysData.uvi.AM1uvi = "-";
    if (!Number.isFinite(todaysData?.pop.AM2pop)) todaysData.pop.AM2pop = "-";
    if (!Number.isFinite(todaysData?.uvi.AM2uvi)) todaysData.uvi.AM2uvi = "-";
    if (!Number.isFinite(todaysData?.pop.PM1pop)) todaysData.pop.PM1pop = "-";
    if (!Number.isFinite(todaysData?.uvi.PM1uvi)) todaysData.uvi.PM1uvi = "-";
  }
  console.log(todaysData);
  console.log(ttData);
  const { weekData: otherWeekData, _ } = getWeekData(weekData?.slice(2));
  console.log(allWeekData);
  console.log(otherWeekData);

  const data = {
    labels: chartData.dateLabels,
    datasets: [
      {
        type: "line",
        label: "気温(最高)",
        data: chartData.maxTemps,
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
        data: chartData.minTemps,
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
        data: chartData.humidities,
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
  // Loading中の表示;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log("エラー発生：", error);
    return <div>{`データ取得エラー：${error}`}</div>;
  }
  return (
    weekData && (
      <>
        <WeatherHeader
          weekClick={weekClick}
          dailyClick={dailyClick}
          viewMode={viewMode}
        />
        <TodayTommorrow
          ttData={ttData}
          todaysData={todaysData}
          viewFlg={viewFlg}
          hourlyData={hourlyData}
          convertJapanWeth={convertJapanWeth}
        />
        <WeatherCards
          otherWeekData={otherWeekData}
          viewFlg={viewFlg}
          convertJapanWeth={convertJapanWeth}
        />
        <WeatherChart data={data} icons={chartData.icons} viewFlg={viewFlg} />
        {console.log(data)}
      </>
    )
  );
}
