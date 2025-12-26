import ShortUsers from "@/components/allUsers/ShortUsers";
import Home from "@/components/home/Home";






function Page() {


  return (
    <div className="z-0  h-full rounded-2xl flex flex-col lg:flex-row overflow-hidden gap-3 w-full overflow-x-hidden ">
      {/* Left section: Stats + Charts */}
      <div className="flex-1 w-full flex flex-col gap-4 min-w-0 h-full ">
        <Home/>
      </div>

      <div className="w-full lg:w-80 shrink min-w-0  h-full ">
          <ShortUsers />
      </div>
    </div>
  );
}

export default Page;
