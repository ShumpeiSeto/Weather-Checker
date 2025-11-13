import "./WeatherChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
export default function WeatherChart({ data, icons, viewFlg }) {
  // データから最高・最低気温を取得して、適切なY軸範囲を計算
  const calculateYAxisRange = () => {
    if (!data || !data.datasets) return { min: 0, max: 30 };

    // 最高気温と最低気温のデータを取得
    const maxTempData =
      data.datasets.find((d) => d.label === "気温(最高)")?.data || [];
    const minTempData =
      data.datasets.find((d) => d.label === "気温(最低)")?.data || [];

    const allTemps = [...maxTempData, ...minTempData];

    if (allTemps.length === 0) return { min: 0, max: 30 };

    const maxTemp = Math.max(...allTemps);
    const minTemp = Math.min(...allTemps);

    // 上下に余裕を持たせる（気温範囲の20%程度）
    const tempRange = maxTemp - minTemp;
    const padding = Math.max(3, Math.ceil(tempRange * 0.2));

    // 5の倍数に丸める
    const yMin = Math.floor((minTemp - padding) / 5) * 5;
    const yMax = Math.ceil((maxTemp + padding) / 5) * 5;

    // stepSizeを適切に設定（範囲に応じて調整）
    const range = yMax - yMin;
    let stepSize;
    if (range <= 15) {
      stepSize = 3;
    } else if (range <= 30) {
      stepSize = 5;
    } else {
      stepSize = 10;
    }

    return { min: yMin, max: yMax, stepSize };
  };

  const yAxisConfig = calculateYAxisRange();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weather Chart",
      },
      datalabels: {
        color: "white",
        anchor: "end",
        font: {
          size: 16,
          //   weight: "bold",
        },
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        max: yAxisConfig.max,
        min: yAxisConfig.min,
        ticks: {
          stepSize: yAxisConfig.stepSize,
        },
      },
      y1: {
        stacked: false,
        position: "right",
        max: 100,
        min: 0,
        ticks: {
          color: "rgba(29, 186, 186, 0.5)",
        },
      },
    },
  };
  return viewFlg === 1 ? (
    <div className="weather">
      <Line height={150} width={300} options={options} data={data} />
      <div className="wicons">
        {icons.map((icon, index) => (
          <div key={index}>
            <img src={`${icon}`} alt="Weather icon" />
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
