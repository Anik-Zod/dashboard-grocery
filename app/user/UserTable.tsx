
import { getUsers } from "@/lib/fetchData";
import { User } from "@/type";
import Image from "next/image";
import Link from "next/link";

export default async function UserTable() {
  const data = await getUsers();
  const users = data.users;

  return (
    <div className="w-full max-w-[1115px] max-h-[567px] overflow-y-auto bg-white  rounded-lg shadow">
      <table className="w-full table-auto">
        <thead className="bg-[#FFEDD4] sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Avatar
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: User, idx: number) => (
            <tr
              key={user._id}
              className={`transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-orange-100/40`}
            >
              <td className="py-4 px-4">
                <Link href={`/profile/${user._id}`}>
                  {user.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400">
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        sizes="40px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                      N/A
                    </div>
                  )}
                </Link>
              </td>

              <td className="py-4 px-4 text-gray-800 font-medium">
                <Link href={`/profile/${user._id}`}>{user.name}</Link>
              </td>

              <td className="py-4 px-4 text-gray-600 truncate max-w-[200px]">
                <Link href={`/profile/${user._id}`}>{user.email}</Link>
              </td>

              <td className="py-4 px-4 text-gray-700">User</td>

              <td className="py-4 px-4">
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
