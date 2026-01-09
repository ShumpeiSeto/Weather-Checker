import { useState, useEffect } from "react";
import { useGeolocation } from "./useGeolocation"; // 自作フックをインポート

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // 1. 位置情報を取得するフックを呼び出す
  const { location, geoError } = useGeolocation();

  useEffect(() => {
    // 位置情報が確定したら、お天気APIを叩く
    if (location) {
      const fetchWeather = async () => {
        try {
          setApiError(null);
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,alerts&appid=${API_KEY}&lang=ja`;

          const response = await fetch(url);
          if (!response.ok) throw new Error("天気データの取得に失敗しました。");

          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setApiError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchWeather();
    }

    // もし位置情報の時点でエラーが出ていたら、ロード状態を解除する
    if (geoError) {
      setIsLoading(false);
    }
  }, [location, geoError]);

  // UI側に返すエラーメッセージ（位置エラーかAPIエラー、どちらかあれば返す）
  const error = geoError || apiError;

  return { weatherData, isLoading, error };
}
