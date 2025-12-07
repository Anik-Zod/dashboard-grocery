import Image from "next/image";

export default function NotFound() {
  return (
<div className=" h-[568px] rounded-lg flex flex-col lg:flex-row bg-white  w-full overflow-hidden">

  <div className="px-20 lg:px-0 lg:pl-10 h-full lg:w-2/5 flex gap-5 flex-col lg:justify-center lg:items-start items-center justify-center">
    <p className="text-8xl text-black/80 font-extrabold">Oops <span>!</span> </p>
    <p className="text-2xl">I Did not Made the Page yet , You looking for  </p>
    <p className="text-lg text-gray-700">Error code: 404 </p>
  </div>

  <div className="relative h-full lg:w-3/5 overflow-hidden">
    <Image
      src="/406.jpg"
      alt="not found"
      fill
      className="object-cover"
      priority
    />
  </div>
</div>

  );
}
