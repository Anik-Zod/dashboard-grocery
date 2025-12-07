import { Suspense } from "react";
import ProfileData from "./ProfileData";
import { getUsers } from "@/lib/fetchData";

export async function generateStaticParams() {
  const response = await getUsers();
  const users = response.users;
  return users.map(user=>({
    id:user._id.toString(),
  }))
}


export default async function ProfilePage({ params }: { params: Promise<{id:string}>}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileData id={id} />
    </Suspense>
  );
}

