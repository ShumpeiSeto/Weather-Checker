// 天気を日本語に変える
export const convertJapanWeth = (engtemp) => {
  if (engtemp === "Clear") return "晴れ";
  else if (engtemp === "Rain") return "雨";
  else if (engtemp === "Clouds") return "くもり";
  else return "雪";
};
// Kelvinから気温に変換する;
export function convertToTemp(kelvin) {
  return +(kelvin - 273.15).toFixed(3);
}

export function getWeekData(mydata) {
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

// dtから日時に変換する
export function checkTTAmPm(dt) {
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

export function checkTOAmPm2(dt) {
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
