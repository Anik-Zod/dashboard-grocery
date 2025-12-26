"use client";

import { Home, Package, Users, UserCircle, Menu, CalendarArrowDown, Warehouse, Truck, CirclePoundSterling, LogOut, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter()


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
    <div className="flex h-full">
      {/* {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40  backdrop-blur-sm lg:hidden"
        ></div>
      )} */}
      {/* Sidebar */}
      <AnimatePresence>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: open ? 280 : 0, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white   rounded-2xl lg:h-full z-50 lg:z-0 overflow-hidden flex flex-col fixed h-[calc(100vh-80px)] top-0  bottom-4 lg:top-0 lg:left-0 lg:relative "
          >
            {/* Header */}
            <div className="p-6 justify-center flex items-center gap-3 border-b border-gray-50">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600 shrink-0">
                    <ShoppingBasket size={24} />
                </div>
                <h1 className="font-bold text-xl text-gray-800 tracking-tight whitespace-nowrap">Grocery<span className="text-orange-500">Dash</span></h1>
            </div>

            <ul className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {menu.map((item) => {
                const isActive = pathname === item.to;
                return (
                <li key={item.name} className="whitespace-nowrap">
                  <Link
                    href={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-orange-50 text-orange-600 shadow-sm"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className={`transition-colors ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                        {item.icon}
                    </div>
                    <span className="font-medium text-base">{item.name}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  </Link>
                </li>
              )})}
            </ul>
            
            <div className="p-4 border-t border-gray-50 bg-gray-50/50">
            {user?
              <button onClick={()=>clearUser()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group whitespace-nowrap">
                <LogOut size={20} className="group-hover:scale-110 transition-transform"/>
                <span className="font-medium text-base">Logout</span>
              </button>:
              <button onClick={()=>router.push("/login")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-green-600 hover:bg-green-50 transition-all duration-200 group whitespace-nowrap">
                <LogOut size={20} className="group-hover:scale-110 transition-transform"/>
                <span className="font-medium text-base">Sign in</span>
              </button> 
            }
            </div>
          </motion.div>
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className=" fixed top-6 left-4 p-2.5 rounded-xl bg-white shadow-md text-gray-600 hover:text-orange-600 z-50 transition-colors"
      >
        <Menu size={20} />
      </button>
    </div>
  );
}
