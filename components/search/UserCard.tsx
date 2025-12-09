"use client";

import { User } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, User2 } from "lucide-react";
import { motion } from "framer-motion";

function UserCard({
  users,
  setOpenSearch,
}: {
  users: User[];
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
      {users?.map((user, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => {
            router.push(`/profile/${user._id}`);
            setOpenSearch(false);
          }}
          className="
            cursor-pointer flex items-center gap-4 p-4
            rounded-xl bg-white 
            border border-gray-100
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
        >
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={user.image || "/profile.png"}
              alt={user.name}
              width={52}
              height={52}
              className="size-13 rounded-full object-cover border shadow-sm"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800 flex items-center gap-1">
              <User2 size={16} className="text-gray-500" />
              {user.name}
            </p>

            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Mail size={14} className="text-gray-400" />
              {user.email}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default UserCard;
