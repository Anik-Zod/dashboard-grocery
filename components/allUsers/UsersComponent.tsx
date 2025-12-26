"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/type";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function UsersComponent({ users }: { users: User[] }) {
  const setAllUsers = useAuthStore((state) => state.setAllUsers);
  useEffect(() => {
    setAllUsers(users);
  }, [users, setAllUsers]);
  return (
    <div className="px-4 py-6 bg-white rounded-2xl shadow-sm hover:shadow-md h-full overflow-y-auto z-0">
      <h2 className="text-xl font-semibold text-gray-700  flex items-center justify-around mb-4">
        Online Users
        <span className="bg-[#F97316] text-white p-3 rounded-2xl"><CirclePlus /></span>
      </h2>
      <div className="flex flex-col gap-3">
        {users?.map((user: User, index: number) => (
          <Link href={`/profile/${user._id}`} key={index}>
            <div
              key={index}
              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="relative w-12 h-12 shrink-0 z-0">
                <Image
                  src={user.image || "/profile.png"}
                  alt={user.name}
                  fill
                  sizes="96px"
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl border-2 border-orange-700"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-800 font-medium truncate">
                  {user.name}
                </p>
                <p className="text-gray-500 text-sm truncate">{user.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UsersComponent;
