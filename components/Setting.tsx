"use client";
import { motion, AnimatePresence } from "motion/react";
import { User, Bell, Lock, CreditCard, Info, LogOut, ChevronRight } from "lucide-react";
import React from "react";

const settingsData = [
  {
    id: 1,
    title: "Profile",
    description: "Update your personal information",
    icon: <User size={22} className="text-gray-600" />,
  },
  {
    id: 2,
    title: "Notifications",
    description: "Manage notification preferences",
    icon: <Bell size={22} className="text-gray-600" />,
  },
  {
    id: 3,
    title: "Security",
    description: "Change password and secure your account",
    icon: <Lock size={22} className="text-gray-600" />,
  },
  {
    id: 4,
    title: "Payment Methods",
    description: "Manage saved cards",
    icon: <CreditCard size={22} className="text-gray-600" />,
  },
  {
    id: 5,
    title: "About",
    description: "Learn more about the app",
    icon: <Info size={22} className="text-gray-600" />,
  },
  {
    id: 6,
    title: "Logout",
    icon: <LogOut size={22} className="text-gray-600" />,
  },
];

export default function SettingsSidebar({
  showSettings,
}: {
  showSettings: boolean;
}) {
  return (
    <div className="relative z-50">
      <AnimatePresence>
        {showSettings && (
          <motion.div
            key="settings-sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[568px] bg-white rounded-l-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                Settings
              </h2>
            </div>

            {/* Settings List */}
            <div className="overflow-y-auto h-full p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {settingsData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      {item.description && (
                        <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                      )}
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
