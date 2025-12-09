"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { MobileViewProps } from "@/type";

import { MessageSquareText, Megaphone, Settings, LogIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";

function MobileView({
  mobile,
  ignorecomplainRef,
  setShowComplain,
  setShowNotification,
  setShowSettings,
  setMobile,
}: MobileViewProps) {
  const {user,clearUser} = useAuthStore((state) => state);
  const router = useRouter();
  return (
    <div className=" bg-white">
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 256 }}
            exit={{ width: 0 }}
            onClick={() => setMobile(!mobile)}
          >
            <div className="px-2 py-2 flex flex-col  gap-2  text-slate-700">
              {/* Chat Icon with Badge */}
              <button
                ref={ignorecomplainRef}
                onClick={() => setShowComplain((prev: boolean) => !prev)}
                className="sm:hidden py-3 px-5  relative p-1 hover:bg-gray-100 rounded-lg transition"
              >
                {" "}
                <div className="flex gap-3">
                  <MessageSquareText className="w-6 h-6 text-[#2d3748]" />
                  <p>Complain</p>
                </div>
                {/* <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-orange-500 transform translate-x-1/4 -translate-y-1/4"></span> */}
              </button>

              {/* Announcement Icon with Badge */}
              <button
                onClick={() => setShowNotification((prev: boolean) => !prev)}
                className="sm:hidden py-3 px-5  relative p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="flex gap-3">
                  <Megaphone className="w-6 h-6 text-[#2d3748]" />
                  <p>Notification</p>
                </div>
                {/* <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-orange-500 transform translate-x-1/4 -translate-y-1/4"></span> */}
              </button>

              {/* Settings Icon */}
              <button
                onClick={() => setShowSettings((prev: boolean) => !prev)}
                className="sm:hidden py-3 px-5  p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="flex gap-3">
                  <Settings className="w-6 h-6 text-[#2d3748]" />
                  <p>Setting</p>
                </div>
              </button>
              {user ? (
                <div
                onClick={()=>clearUser()}
                className="cursor-pointer flex gap-3 py-3 px-5 bg-red-500/20 rounded-lg text-red-600">
                  <LogIn />
                  logout
                </div>
              ) : (
                <div
                  onClick={() => router.push("/login")}
                  className="cursor-pointer flex gap-3 py-3 px-5 bg-green-500/20 rounded-lg text-green-600"
                >
                  <LogIn />
                  login
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileView;
