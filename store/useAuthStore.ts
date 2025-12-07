// store/useAuthStore.ts
import { User } from "@/type";
import { useEffect } from "react";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  allUsers: User[] | null;
  showLogin: boolean;
  setUser: (user: User) => void;
  setAllUsers:(users:User[])=>void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  allUsers: null,
  showLogin: true,

  setUser: (user) => {
    set({ user });
    if (typeof window !== "undefined")
      localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null });
    if (typeof window !== "undefined") localStorage.removeItem("user");
  },
  setAllUsers :(users) =>{
    set({allUsers:users});
  }
}));

// Hook to sync Zustand with localStorage on client-side
export function useAuthInit() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [setUser]);
}
