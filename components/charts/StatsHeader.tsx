// StatsHeader.jsx
import React from "react";

export default function StatsHeader({
  yellowCount = 1982,
  orangeCount = 1345,
  total = 3982,
  barPercent = 75, // e.g. total / goal * 100
}) {
  return (
    <div className=" p-4">
      <h2 className="text-xl  font-semibold pl-2 pt-2  text-slate-800">
        Project Statistic
      </h2>

      <div className="flex ">
        {/* this week  */}
        <div className="flex justify-between min-w-[200px] max-w-[250px] w-full mt-4 ">
          {/* Yellow stat */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-3 border-yellow-400"></span>
            <div>
              <div className="text-sm text-gray-500">This Week</div>
              <div className="text-lg font-semibold text-slate-900">
                {yellowCount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Orange stat */}
          <div className="  sm:flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <div>
              <div className="text-sm text-gray-500">This Week</div>
              <div className="text-lg font-semibold text-slate-900">
                {orangeCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* total  */}
        <div className="sm:hidden flex lg:flex flex-col justify-center items-end  w-full">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-semibold text-slate-900">
            {total.toLocaleString()}
          </div>
          <div className="mt-2 w-[80%] h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${barPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
