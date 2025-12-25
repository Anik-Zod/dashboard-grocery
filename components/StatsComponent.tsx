"use client"
import React from 'react';
import { LucideIcon, Camera, FilePlus, Wallet, BarChart } from 'lucide-react';
import { motion } from "framer-motion";

interface StatItemProps {
  Icon: LucideIcon;
  color: string;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ Icon, color, value, label }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 w-full group">
      {/* Icon Container: Clean & Circular */}
      <div className="relative flex-shrink-0 flex items-center justify-center size-12 rounded-xl bg-gray-100/80 border-gray-300 border group-hover:bg-white transition-colors duration-300 overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Icon className={`${color} group-hover:scale-110 transition-transform duration-300`} size={24} strokeWidth={2} />
        </motion.div>
      </div>

      {/* Text Content: Aligned for Optical Balance */}
      <div className="flex flex-col items-center sm:items-end flex-grow mt-2 sm:mt-0">
        <div className="text-2xl font-black tracking-tight text-slate-900 leading-none">
          {value}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-slate-400 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
};

const StatsComponent = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex gap-1 sm:gap-3 items-center w-full">
        <StatItem Icon={Camera} color="text-rose-500" value="932" label="Projects" />
        <StatItem Icon={FilePlus} color="text-blue-500" value="1,032" label="Inquiries" />
        <StatItem Icon={Wallet} color="text-indigo-500" value="102k" label="Investment" />
        <StatItem Icon={BarChart} color="text-emerald-500" value="32k" label="Assets" />
      </div>
    </div>
  );
};

export default StatsComponent;