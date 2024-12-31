import { Line } from "react-chartjs-2";
import useGet from "../../hooks/useGet";

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
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

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

export default function ChartComponent({statistic}) {


  const data = {
    labels: statistic.map((data) => `${new Intl.DateTimeFormat('fa-IR').format(new Date(data.date))}`), // روزها به عنوان برچسب محور X
    datasets: [
      {
        label: "بازدید روزانه",
        data: statistic.map((data) => data.count), // تعداد بازدیدها
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
            family: 'YekanBakh-Regular'
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
            family: "YekanBakh-Regular",
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
            family: "YekanBakh-Regular",
          },
        },
        min: 0,
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "YekanBakh-Regular",
          },
          autoSkip: false, // Disable auto skipping
          maxRotation: 45, // Rotate labels if necessary
          minRotation: 30,
        },
        title: {
          display: true,
          text: "روزهای ماه",
          padding: {
            top: 10,
          },
          font: {
            size: 14,
            family: "YekanBakh-Regular",
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
