"use cache";
import ComposedChartExample from "../charts/ComposedChartExample";
import EmailSourceChart from "../charts/EmailSourceChart";
import StatsComponent from "../StatsComponent";
async function Home() {
  return (
    <div className="flex flex-col gap-3">
      <StatsComponent />

      <div className="flex flex-col md:flex-row gap-16 md:gap-3 min-w-0">
        <div className="flex-1 min-w-0 showing">
          <ComposedChartExample />
        </div>
        <div className="flex-1 -mt-12 sm:mt-0 min-w-0 lg:max-w-[300px]">
          <EmailSourceChart />
        </div>
      </div>
    </div>
  );
}

export default Home;
