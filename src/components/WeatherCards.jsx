import "./WeatherCards.css";
import WeatherCard from "./WeatherCard";
export default function WeatherCards({ weekData, viewFlg, convertJapanWeth }) {
  return (
    <div className="weather-infos">
      {weekData.map((day, index) => {
        return (
          viewFlg && (
            <WeatherCard
              key={index}
              current={current}
              day={day}
              index={index}
              convertJapanWeth={convertJapanWeth}
            />
          )
        );
      })}
    </div>
  );
}
