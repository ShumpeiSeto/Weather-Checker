import { useState, useEffect } from "react";

export function useWeather() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  // お天気情報取得
  const fetchWeatherData = async (location) => {
    if (!location) {
      throw new Error("Location is not defined");
    }
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
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

  // 現在地取得
  console.log("現在地情報を取得します");
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

  // 天気データを取得
  //  console.log(location);
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
  return { weatherData, isLoading, error };
}
