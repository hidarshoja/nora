import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// ثبت کردن اجزای مورد نیاز Chart.js
Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

// داده‌های بازدید 30 روزه
const dailyVisits = [
  { day: "1", visits: 120 },
  { day: "2", visits: 150 },
  { day: "3", visits: 180 },
  { day: "4", visits: 130 },
  { day: "5", visits: 170 },
  { day: "6", visits: 220 },
  { day: "7", visits: 240 },
  { day: "8", visits: 200 },
  { day: "9", visits: 250 },
  { day: "10", visits: 300 },
  { day: "11", visits: 320 },
  { day: "12", visits: 350 },
  { day: "13", visits: 400 },
  { day: "14", visits: 430 },
  { day: "15", visits: 450 },
  { day: "16", visits: 480 },
  { day: "17", visits: 500 },
  { day: "18", visits: 520 },
  { day: "19", visits: 550 },
  { day: "20", visits: 570 },
  { day: "21", visits: 600 },
  { day: "22", visits: 620 },
  { day: "23", visits: 650 },
  { day: "24", visits: 670 },
  { day: "25", visits: 700 },
  { day: "26", visits: 730 },
  { day: "27", visits: 750 },
  { day: "28", visits: 780 },
  { day: "29", visits: 800 },
  { day: "30", visits: 850 },
];

export default function ChartComponent() {
  const [dataFetch, setDataFetch] = useState([]);

  // گرفتن داده‌ها از API
  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      setDataFetch(response.data);
      console.log("مقدار چارت:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // داده‌های چارت
  const data = {
    labels: dailyVisits.map((data) => ` ${data.day}`), // روزها به عنوان برچسب محور X
    datasets: [
      {
        label: "بازدید روزانه",
        data: dailyVisits.map((data) => data.visits), // تعداد بازدیدها
        borderColor: "#42a5f5", // رنگ خط نمودار
        borderWidth: 3,
        pointBorderColor: "#42a5f5", // رنگ نقطه‌ها
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true, // پر کردن نمودار با رنگ
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#42a5f5"); // رنگ ابتدایی
          gradient.addColorStop(1, "white"); // رنگ انتهایی
          return gradient;
        },
      },
    ],
  };

  // تنظیمات نمودار
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            family: 'YekanBakh-Regular' // فونت جدید
          },
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "YekanBakh-Regular", // فونت جدید برای محور Y
          },
        },
        title: {
          display: true,
          text: "تعداد بازدید",
          padding: {
            bottom: 10,
          },
          font: {
            size: 14,
            family: "YekanBakh-Regular", // فونت جدید برای عنوان محور Y
          },
        },
        min: 50, // حداقل تعداد بازدید
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "YekanBakh-Regular", // فونت جدید برای محور X
          },
        },
        title: {
          display: true,
          text: "روزهای ماه",
          padding: {
            top: 10,
          },
          font: {
            size: 14,
            family: "YekanBakh-Regular", // فونت جدید برای عنوان محور X
          },
        },
      },
    },
  };

  const containerStyle = {
    width: "100%", // عرض 100% برای نمودار
    height: "100%",
    padding: "20px",
    cursor: "pointer",
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <h1 className="font-bold text-xl text-color2 text-center mt-10">
          نمودار بازدید روزانه 30 روز گذشته
        </h1>
        <p className="text-center py-5 text-color2">
          نمودار بازدید روزانه سایت در طول 30 روز گذشته.
        </p>
      </div>
      <div className="w-full min-h-[180px] md:min-h-96 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="w-full">
          <Line data={data} options={options} style={containerStyle}></Line>
        </div>
      </div>
    </>
  );
}
