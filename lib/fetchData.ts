import { User } from "@/type";

// lib/fetchData.ts
export interface UsersResponse {
  users: User[];
  // ... other fields if any
}

export async function getUsers(): Promise<UsersResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAll`,
    {
      next: { revalidate: 30 },
    }
  );

  // If 429 or other error status — throw, so consumer can handle
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  console.log("getUser() running");
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON, got: ${contentType}`);
  }

  const data = await res.json();
  return data as UsersResponse;
}

export async function getProfile(id: string): Promise<User | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get/${id}`,{
    next:{ revalidate: 30 }
});

  if (!res.ok) return null;
  const data = await res.json();
  return data as User;
}

export async function getMyOrder(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/myOrder/${id}`,
      {
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      // handle HTTP error
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return null; // or throw error or return a custom error object
  }
}
