import { useState, useEffect } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: false, // 成功した設定
      timeout: 10000,
      maximumAge: 30000,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation Error:", err);
        setGeoError("位置情報の取得に失敗しました。");
      },
      options
    );
  }, []);

  return { location, geoError };
}
