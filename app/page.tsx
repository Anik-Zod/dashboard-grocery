
import Home from "@/components/home/Home";
import ShortUsers from "@/components/ShortUsers";





function Page() {
 
  return (
    <div className="z-0   flex flex-col lg:flex-row gap-3 w-full overflow-x-hidden">
      {/* Left section: Stats + Charts */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <Home/>
      </div>

      <div className="w-full lg:w-80 shrink min-w-0  ">
          <ShortUsers />
      </div>
    </div>
  );
}

export default Page;
