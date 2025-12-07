
"use cache"
import ComposedChartExample from "../charts/ComposedChartExample";
import EmailSourceChart from "../charts/EmailSourceChart";
import StatsComponent from "../StatsComponent";
;

async function Home() {
  return (
    <div className="flex flex-col gap-3">
      <StatsComponent />

      <div className="flex flex-col md:flex-row gap-3 min-w-0">
        <div className="flex-1 min-w-0 ">
          <ComposedChartExample />
        </div>
        <div className="flex-1 min-w-0">
          <EmailSourceChart />
        </div>
      </div>
    </div>
  );
}

export default Home;
