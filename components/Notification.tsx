 "use client"  
import { motion, AnimatePresence } from "motion/react";
import { Bell, CheckCircle2, Clock, Package, Truck } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #45321 has been successfully placed.",
    time: "2 min ago",
    icon: <Package size={22} className="text-orange-500" />,
    bg: "bg-orange-100",
  },
  {
    id: 2,
    title: "Product Delivered",
    message: "Order #44211 has been delivered.",
    time: "1 hour ago",
    icon: <Truck size={22} className="text-green-600" />,
    bg: "bg-green-100",
  },
  {
    id: 3,
    title: "Stock Alert",
    message: "Potato 1kg stock is running low.",
    time: "3 hours ago",
    icon: <Clock size={22} className="text-blue-600" />,
    bg: "bg-blue-100",
  },
  {
    id: 4,
    title: "Payment Success",
    message: "Payment received for Order #44999.",
    time: "Yesterday",
    icon: <CheckCircle2 size={22} className="text-purple-600" />,
    bg: "bg-purple-100",
  },
];

export default function Notification({
  showNotification,
}: {
  showNotification: boolean;
}) {
  return (
    <div className="relative z-50">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            key="notification-sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen bg-white  shadow-[0_18px_25px_rgba(0,0,0,0.35)] rounded-l-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4   bg-gray-50">
              <h2 className="text-lg font-bold text-gray-700 flex pl-3 items-center gap-2">
                <Bell size={20} className="text-orange-500" />
                Notifications
              </h2>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto h-full p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {notifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white  p-4 shadow-sm hover:shadow-md  hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 ${n.bg} rounded-2xl flex items-center justify-center`}
                    >
                      {n.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {n.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{n.message}</p>
                      <p className="text-gray-400 text-xs mt-1">{n.time}</p>
                    </div>
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
