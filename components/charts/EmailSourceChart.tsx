'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Primary', value: 100, percentage: 27, color: '#C4C4C4' },    // purple
  { name: 'Promotion', value: 70, percentage: 11, color: '#F2F2F2' },  // dark navy
  { name: 'Forum', value: 269, percentage: 22, color: '#F97316' },      // orange
  { name: 'Socials', value: 154, percentage: 15, color: '#FBBF24' },    // yellow/amber
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label for Promotion (11%) like in the screenshot
  if (percent === 0.11) {
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return null;
};

export default function EmailSourceChart() {
  return (
    <>
      <div className="w-full  mx-auto bg-white rounded-lg shadow-sm p-6 h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Email</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>

        <ResponsiveContainer width="100%" height={202}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value} emails`} />
          </PieChart>
        </ResponsiveContainer>

        <div className="">
          <p className="text-sm font-medium text-gray-500 mb-3">Legend</p>
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="text-gray-700 font-medium">
                    {item.name} ({item.percentage}%)
                  </span>
                </div>
                <span className="text-gray-900 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}