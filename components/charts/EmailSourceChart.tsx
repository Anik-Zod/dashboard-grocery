'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Primary', value: 100, percentage: 27, color: '#8B5CF6' },    // purple
  { name: 'Promotion', value: 70, percentage: 11, color: '#1E293B' },   // dark navy
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
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-orange-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900">Email Sources</h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      <div className="relative mb-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={70}
              innerRadius={45}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value}`, 'Emails']}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center total display */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>

      <div className="space-y-2   ">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-3 min-py-1  rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-sm font-medium text-gray-700">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}