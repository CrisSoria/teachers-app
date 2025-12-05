import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/features/auth/interfaces/auth.interface";

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  removeUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser) =>
        set((state: IUserStore) => ({ ...state, user })),
      removeUser: () => set((state) => ({ ...state, user: null })),
    }),
    {
      name: "user-store",
    }
  )
);
