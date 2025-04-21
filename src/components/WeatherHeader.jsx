import "./WeatherHeader.css";
export default function WeatherHeader({ handleClick, resetClick }) {
  return (
    <div className="weather-header">
      <h2>お天気調べましょう！</h2>
      <button onClick={handleClick}>調べる</button>
      <button onClick={resetClick}>リセット</button>
      {/* <h2>{viewFlg ? "天気予報" : "お天気情報"}</h2>
      <p>{viewFlg ? convertJapanWeth("晴れ") : "天気情報"}</p> */}
    </div>
  );
}
