"use client";

import { motion } from "framer-motion";
import { Bell, Clock, Heart, Settings, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Order, User } from "@/type";

type Props = {
  user: User;
  orders: Order[];
};

export default function UserProfile({ user, orders }: Props) {
  return (
    <motion.div className=" pt-10 ">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* PROFILE SIDEBAR */}
        <motion.div className="bg-linear-to- from-white to-green-50 rounded-lg px-6 flex flex-col items-center">
        <div className="size-20 rounded-full border-4 border-green-500 overflow-hidden ">
          <Image
            src={user.image || "/profile.png"}
            alt={user.name as string}
            width={112}
            height={112}
            className=" object-cover"
            />
          </div>
          <h2 className="mt-4 text-xl md:text-2xl font-bold text-gray-800 text-center">
            {user.name}
          </h2>
          <p className="text-gray-500 text-sm text-center">{user.email}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-2 border text-black font-semibold rounded-lg hover:bg-green-700 hover:text-white transition-all duration-500 w-full"
          >
            Edit Profile
          </motion.button>

          <div className="mt-8 w-full flex flex-col gap-3">
            <ActionButton icon={<ShoppingBag />} label="Orders" />
            <ActionButton icon={<Bell />} label="Notifications" />
            <ActionButton icon={<Heart />} label="Wishlist" />
            <ActionButton icon={<Settings />} label="Settings" />
          </div>
        </motion.div>

        {/* MAIN DASHBOARD */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* STAT CARDS */}
          <div className="flex pr-4 gap-4">
            <StatCard
              title="Orders"
              value={orders.length}
              icon={<ShoppingBag />}
              color="green"
            />
            <StatCard
              title="Notifications"
              value={0}
              icon={<Bell />}
              color="blue"
            />
            <StatCard
              title="Settings"
              value={4}
              icon={<Settings />}
              color="purple"
            />
             <StatCard
              title="Revinew"
              value={orders.length}
              icon={<ShoppingBag />}
              color="green"
            />
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-3xl py-6">
            <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg">
              <Clock /> Recent Activity
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Your latest orders & actions
            </p>

            <ul className="divide-y divide-gray-200 max-h-96 overflow-auto">
              {orders?.length === 0 ? (
                <li className="text-gray-500 py-3 text-center">
                  No recent activity
                </li>
              ) : (
                orders.map((order) => (
                  <motion.li
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-3 flex justify-between items-center hover:bg-green-50 rounded-lg px-3 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        {order.items.map((item) => (
                          <Image
                            key={item._id}
                            src={item.product.image[0]}
                            alt={item.product.name}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-white shadow-sm object-cover"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xs font-medium border-2 border-white">
                            +{order.items.length - 3}
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Ordered {order.items.length} item
                          {order.items.length > 1 ? "s" : ""}
                        </span>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))
              )}
            </ul>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="bg-white border w-full  border-gray-300 rounded-lg py-3 px-3 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className={`${colors[color]} p-3 rounded-lg`}>{icon}</div>
        <div>
          <p className="text-gray-500 text-md">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-green-50 transition">
      <span className="text-gray-700">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </button>
  );
}
