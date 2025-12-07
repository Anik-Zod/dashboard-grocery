import { getMyOrder, getProfile } from "@/lib/fetchData";
import UserProfile from "./UserProfile";



export default async function ProfileData({ id }: { id: string }) {
  const user = await getProfile(id);
  const orders = await getMyOrder(id);
  if(!user){
    return <div>User data is not available now , try again leter</div>
  }
  return (
    <div className=" h-[566px] w-full  overflow-hidden bg-white rounded-lg shadow ">
     <UserProfile user={user} orders={orders.orders}/> 
    </div>
  );
}
