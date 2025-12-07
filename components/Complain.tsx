"use client";
import { Siren } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Complaint = {
  id: number;
  userName: string;
  complaint: string;
  time: string;
  image:string;
  status: "pending" | "resolved" | "in-progress";
};

const complaintsData: Complaint[] = [
  {
    id: 1,
    userName: "Shimu Das",
    complaint: "App is slow on login",
    time: "5 min ago",
    image:"/shimu.jpg",
    status: "pending",
  },
  {
    id: 2,
    userName: "pratima Das",
    complaint: "Payment failed but money debited",
    time: "1 hour ago",
    image:"/pratima.jpg",
    status: "in-progress",
  },
  {
    id: 3,
    userName: "Mrinal Kanti Das",
    complaint: "Cannot upload profile picture",
    time: "Yesterday",
    image:"/mrinal.jpg",
    status: "resolved",
  },
  {
    id: 4,
    userName: "mithu Das",
    complaint: "Didnot got my delivery",
    time: "Yesterday",
    image:"/mithu.jpg",
    status: "resolved",
  },
];

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

export default function Complain({
  showComplaints,
}: {
  showComplaints: boolean;
}) {
  return (
    <div className="relative z-50">
      <AnimatePresence>
        {showComplaints && (
          <motion.div
            key="complaint-sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 360, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full bg-white rounded-l-xl flex flex-col border-l border-gray-200"
          >
            <div className="flex gap-4 px-6 py-5 border-b border-gray-200">
              <Siren color="orange" size={25} />
              <h2 className="text-lg font-semibold text-gray-900">
                User Complaints
              </h2>
            </div>

            <div className="p-4 flex-1 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {complaintsData.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                        <Image src={c.image} alt={c.userName} width={45} height={45} className="object-cover rounded-full size-10"/>
                         <p className="text-gray-900 font-medium">{c.userName}</p>
                        </div>
                      <p className="text-gray-700 text-sm mt-1 ">
                        {c.complaint}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[c.status]
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{c.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
