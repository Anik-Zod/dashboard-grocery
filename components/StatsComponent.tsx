import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Camera, FilePlus, Wallet, BarChart } from 'lucide-react';
import * as motion from "motion/react-client"

interface StatItemProps {
  Icon: LucideIcon;
  color: string;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ Icon, color, value, label }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-around  p-4 bg-white rounded-lg shadow  w-full ">
       <div className='overflow-hidden border sm:mb-0 mb-3 border-gray-300 size-15 flex justify-center items-center'>
        <motion.div
        initial={{rotate:-40,y:45}}
        whileInView={{rotate:0,y:0}}
         transition={{ type: "spring", duration: 0.3, stiffness: 300 }}
        >
          <Icon className={` ${color} mb-2`} size={30} />
        </motion.div>
       </div>
      <div >
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