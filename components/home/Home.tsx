"use cache";
import ComposedChartExample from "../charts/ComposedChartExample";
import EmailSourceChart from "../charts/EmailSourceChart";
import StatsComponent from "../StatsComponent";
async function Home() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <StatsComponent />

      <div className="flex flex-col md:flex-row gap-16 md:gap-3 min-w-0 rounded-2xl h-full">
        <div className="flex-1 min-w-0 h-full">
          <ComposedChartExample />
        </div>
        <div className="flex-1 sm:mt-0 mt-24 min-w-0 lg:max-w-[300px] h-full">
          <EmailSourceChart />
        </div>
      </div>
    </div>
  );
}

export default Home;
