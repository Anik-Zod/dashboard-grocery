"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/useDebounce";


function SearchBox({ openSearch,setOpenSearch }: { openSearch: boolean;setOpenSearch:React.Dispatch<React.SetStateAction<boolean>> }) {
  const { allUsers } = useAuthStore((state) => state);
  const [input, setInput] = useState("");

  const debounceText = useDebounce(input,400)

  const filteredData =
  allUsers?.filter((user) => {
    const text = debounceText.toLowerCase().trim();
    if (text === "") return true;  

    return (
      user.name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text)
    );
  }) || [];
  
  


  return (
    <div className="">
      <AnimatePresence>
        <motion.div
          key="notification-sidebar"
          initial={{ opacity: 0 }}
          animate={{ opacity: openSearch ? 1 : 0 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" lg:w-5xl sm:w-2xl min-w-[400px] z-[9999] rounded-2xl max-h-[500px]  bg-white border border-gray-400 overflow-hidden animate-scaleIn"
        >
          {/* HEADER */}
          <div className="bg-linear-to-r  to-[#ff9950] from-[#d35800] text-white  px-4 py-7">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 justify-center items-center ml-3">
                <div className="bg-white/30 p-3 rounded-2xl">
                  <Search />
                </div>
                <h2 className="font-semibold text-xl">Find Users </h2>
              </div>

              <button
              onClick={()=>setOpenSearch(false)}
                className="mr-10 cursor-pointer transition   rounded-full p-1"
                //here onclick close
              >
                <X />
              </button>
            </div>
            {/* SEARCH INPUT */}
            <div className="px-4 mt-6 relative">
              <input
                autoFocus
                onChange={(e)=>setInput(e.target.value)}
                type="text"
                placeholder="Search by name or email . . ."
                className="pl-14 w-full text-[16px] rounded-2xl border border-white/30 px-4 py-2 focus:ring-2 focus:bg-white/20 bg-white/10 focus:ring-gray-500 outline-none"
              />
              <div className="text-white/40 absolute top-3 left-12">
                <Search size={20} />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="h-107 overflow-y-auto px-4 pb-4"> 
            <div className="w-full flex gap-3 items-center mt-6 justify-center mb-3">
              <div className="p-3 bg-linear-to-b from-green-800 to-green-600 rounded-full">
                <Search color="white" size={20} />
              </div>
              <p className="text-md text-gray-600 ">
                explore users by name or email 
              </p>
            </div>
             {
              filteredData&&(
                <UserCard setOpenSearch={setOpenSearch} users={filteredData}/>
              )
             }
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SearchBox;
