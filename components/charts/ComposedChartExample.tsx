"use client";

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Bar,
  Line,
} from "recharts";
import { ChevronDown, MoreHorizontal } from "lucide-react";
// #region Sample data
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface StatLegendProps {
  color: string;
  period: string;
  value: string;
}

// #endregion
const ComposedChartExample = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => (
  <div>
    <div className="mb-3">
      <ProjectStatistic />
    </div>
    <ComposedChart
      responsive
      data={data}
      className="bg-white rounded-lg pt-10 px-2 min-w-[100px] h-83 shadow"
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Legend />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="amt"
        fill="#FDE4E3"
        stroke="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Bar
        dataKey="pv"
        barSize={20}
        fill="#ef6e4e"
        isAnimationActive={isAnimationActive}
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#FA8D10"
        isAnimationActive={isAnimationActive}
      />
    </ComposedChart>
  </div>
);

const StatLegend: React.FC<StatLegendProps> = ({ color, period, value }) => {
  return (
    <div className="flex items-center space-x-2 min-w-0">
      {/* Color dot */}
      <div className={`w-3 h-3 rounded-full shrink-0 ${color}`}></div>

      {/* Period label */}
      <span className="text-sm text-gray-600 truncate max-w-10 sm:max-w-[120px] md:max-w-40">
        {period}
      </span>

      {/* Value */}
      <span className="text-xl font-bold text-gray-800 truncate max-w-[100px] sm:max-w-[150px]">
        {value}
      </span>
    </div>
  );
};

const ProjectStatistic = () => {
  const total = "3.982";
  const progress = 50; // Approximate percentage based on the image; adjust if needed

  return (
    <div className="bg-white p-4  w-full mx-auto rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Project Statistic
        </h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-sm">This Month</span>
          <ChevronDown className="w-4 h-4" />
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <StatLegend color="bg-yellow-400" period="This Week" value="1.982" />
        <StatLegend color="bg-red-400" period="This Month" value="1.345" />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-2xl font-bold text-gray-800">{total}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-400 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ComposedChartExample;
