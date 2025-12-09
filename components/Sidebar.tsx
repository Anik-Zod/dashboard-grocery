"use client";

import { Home, Package, Users, UserCircle, Menu, CalendarArrowDown, Warehouse, Truck, CirclePoundSterling, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [open, setOpen] = useState(() => {  
    // Only access window on the client
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false; // server render
  });
  const user = useAuthStore(state=>state.user)
  const clearUser = useAuthStore(state=>state.clearUser)
  const pathname = usePathname()


  const menu = [
    { name: "Home", icon: <Home size={20} />, to: "/" },
    { name: "Products", icon: <Package size={20} />, to: "/products" },
    { name: "User", icon: <Users size={20} />, to: "/user" },
    { name: "Profile", icon: <UserCircle size={20} />,  to: user ? `/profile/${user._id}` : "/login" },
    {name:"Orders",icon:<CalendarArrowDown size={20}/>,to:"/orders"},
    // {name:"Admins",icon:<ShieldUser size={20}/>,to:"/admins"},
    {name:"Inventory",icon:<Warehouse size={20}/>,to:"/Inventory"},
    {name:"Delivery",icon:<Truck size={20}/>,to:"/delivery"},
    {name:"Reveniew",icon:<CirclePoundSterling size={20}/>,to:"/revinew"},
  ];

  return (
    <div className="flex ">
      {/* Sidebar */}
      <AnimatePresence>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: open?256:0 }}
            exit={{ width: 0 }}
            className="bg-white  shadow rounded-lg  h-[568px] overflow-hidden flex flex-col"
          >
            <ul className="space-y-2 px-3  py-4 flex-1">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.to}
                    className={`flex pl-13 items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
                      ${
                        (pathname === item.to)
                          ? "bg-orange-100 text-orange-500 font-semibold"
                          : "text-gray-500 hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.icon}
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {user?
              <div onClick={()=>clearUser()} className=" mb-4 cursor-pointer hover:scale-105 hover:bg-[#e7d0ce] transition-all flex text-[#ee5f3b] font-semibold mx-4 rounded-lg py-3 pl-14 bg-[#FEEFEE] items-center gap-3">
                <LogOut size={20}/>
                <span>Logout</span>
              </div>:
              <div onClick={()=>redirect("/login")} className=" mb-4 cursor-pointer hover:scale-105 hover:bg-[] transition-all flex text-green-600 font-semibold mx-4 rounded-lg py-3 pl-14 bg-green-500/20 items-center gap-3">
                <LogOut size={20}/>
                <span>Sign in</span>
              </div> 
            }
          </motion.div>
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer absolute top-7 left-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200 z-50"
      >
        <Menu size={24} />
      </button>
    </div>
  );
}
