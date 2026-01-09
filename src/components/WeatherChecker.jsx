import { useState, useEffect } from "react";
import "./WeatherChecker.css";
import {
  convertJapanWeth,
  getWeekData,
  checkTTAmPm,
  checkTOAmPm2,
} from "../utils/weatherUtils";
import { useWeather } from "../hooks/useWeather";
import WeatherCards from "./WeatherCards";
import WeatherChart from "./WeatherChart";
import WeatherHeader from "./WeatherHeader";
import TodayTommorrow from "./TodayTommorrow";

export default function WeatherChecker() {
  // 位置情報取得とAPI実行
  const { weatherData, isLoading, error } = useWeather();

  // const [current, setCurrent] = useState(null);
  const [viewFlg, setViewFlg] = useState(1);
  const [viewMode, setViewMode] = useState("weekmode");

  function weekClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(1);
  }
  function dailyClick(selectedButton) {
    setViewMode(selectedButton);
    setViewFlg(2);
  }

  // 週間データの取得
  const weekData = weatherData?.daily;
  const hourlyData = weatherData?.hourly;

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

  const { weekData: allWeekData, chartData } = getWeekData(weekData);
  const ttData = { today: allWeekData[0], tommorrow: allWeekData[1] };

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
  const { weekData: otherWeekData, _ } = getWeekData(weekData?.slice(2));

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
