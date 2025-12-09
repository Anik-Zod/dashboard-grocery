import { getUsers } from "@/lib/fetchData";
import UsersComponent from "./UsersComponent";


async function ShortUsers() {
  const data = await getUsers();
  const users = data?.users || [];

  return <UsersComponent users={users}/>
}

export default ShortUsers;
