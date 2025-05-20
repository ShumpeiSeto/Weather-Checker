import "./WeatherCards.css";
import WeatherCard from "./WeatherCard";
export default function WeatherCards({
  otherWeekData,
  viewFlg,
  convertJapanWeth,
}) {
  return (
    <div className="weather-infos">
      {otherWeekData.map((day, index) => {
        return (
          viewFlg === 1 && (
            <WeatherCard
              key={index}
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
