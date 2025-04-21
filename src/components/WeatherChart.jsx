import "./WeatherChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
// import { BsBorderWidth } from "react-icons/bs";
// import { MdBorderColor } from "react-icons/md";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
export default function WeatherChart({ data, icons, viewFlg }) {
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
        max: 25,
        min: 10,
        ticks: {
          stepSize: 3,
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
  return (
    { viewFlg } && (
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
    )
  );
}
