import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAttendanceProcessed } from "@/features/attendance/interfaces/types";

export interface IAttendanceStore {
  attendance: IAttendanceProcessed | null;
  setAttendance: (attendance: IAttendanceProcessed) => void;
  removeAttendance: () => void;
}

export const useAttendanceStore = create<IAttendanceStore>()(
  persist(
    (set) => ({
      attendance: null,
      setAttendance: (attendance: IAttendanceProcessed) =>
        set((state: IAttendanceStore) => ({ ...state, attendance })),
      removeAttendance: () => set((state) => ({ ...state, attendance: null })),
    }),
    {
      name: "attendance-store",
    }
  )
);
