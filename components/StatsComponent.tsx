import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Camera, FilePlus, Wallet, BarChart } from 'lucide-react';

interface StatItemProps {
  Icon: LucideIcon;
  color: string;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ Icon, color, value, label }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-around  p-4 bg-white rounded-lg shadow  w-full ">
      <Icon className={`w-6 h-6 ${color} mb-2`} />
      <div>
        <div className="sm:text-3xl font-bold text-gray-800 text-center ">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
};

const StatsComponent = () => {
  return (
    <div className="flex sm:gap-3 gap-1 items-center  w-full  rounded-lg  mx-auto">
      <StatItem Icon={Camera} color="text-red-400" value="932" label="Project" />
      <StatItem Icon={FilePlus} color="text-blue-400" value="1,032" label="Inquiries" />
      <StatItem Icon={Wallet} color="text-blue-400" value="102k" label="Investment" />
      <StatItem Icon={BarChart} color="text-red-400" value="32k" label="Assets" />
    </div>
  );
};

export default StatsComponent;