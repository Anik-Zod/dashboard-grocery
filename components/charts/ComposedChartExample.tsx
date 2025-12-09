// VisitorsLineChart.jsx
"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import StatsHeader from "./StatsHeader";

// Register needed Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data = {
  labels,
  datasets: [
    {
      label: "Visitors",
      data: [20, 38, 18, 70, 60, 55, 70],
      borderColor: "#FA8D10",
      backgroundColor: "white",
      tension: 0, // straight lines instead of curved
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "Another Metric",
      data: [44, 52, 63, 56, 33, 18, 69],
      borderColor: "#FBBF24",
      backgroundColor: "white",
      tension: 0, // straight lines
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // allow custom height
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const value = context.raw;
          const percent = Math.round((value / 1000) * 100); // adjust as needed
          return `${percent}% (${value} Visitors)`;
        },
      },
      backgroundColor: "#1E293B",
      titleColor: "#fff",
      bodyColor: "#fff",
      displayColors: false,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        color: "#6B7280",
      },
      grid: {
        color: "#E5E7EB",
      },
    },
    x: {
      ticks: {
        color: "#6B7280",
      },
      grid: {
        display: false,
      },
    },
  },
};

export default function VisitorsLineChart() {
  return (
    <div className="bg-white space-y-4 h-full max-h-[313px]  rounded-lg ">
      <StatsHeader />
      <div className="w-full relative bg-white h-full " >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
