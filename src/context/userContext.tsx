"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  phoneNumber?: string;
  verified?: boolean;
  gender?: "male" | "female";
  workoutGoal?: "lose-weight" | "increase-strength" | "bulk" | "try-test";
  workoutDays?: number;
  workoutPlace?: "home" | "gym";
  healthCondition?: "healthy" | string[];
  focusPart?: string[];
  height?: number;
  weight?: number;
  idealWeight?: number;
  birthDate?: string;
  bodyForm?: "thin" | "obese";
  bodyImage?: string;
  dietPlan?: boolean;
  interestSport?:
    | "running"
    | "trx"
    | "hiking"
    | "skating"
    | "biking"
    | "body-builing";
  userPlan?: "1-month" | "6-months" | "12-months";
};

const STORAGE_KEY = "user_data";

const initialUserData: User = {
  phoneNumber: "",
  verified: false,
  gender: "male",
  workoutGoal: "lose-weight",
  workoutDays: 1,
  workoutPlace: "home",
  healthCondition: "healthy",
  focusPart: [""],
  height: 172,
  weight: 70,
  idealWeight: 70,
  birthDate: "",
  bodyForm: "thin",
  bodyImage: "",
  dietPlan: true,
  interestSport: "running",
  userPlan: "1-month",
};

interface UserDataContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  updateUser: (data: Partial<User>) => void;
}

export const UserContext = createContext<UserDataContext>({
  user: initialUserData,
  setUser: () => {},
  updateUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUserData);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser({ ...initialUserData, ...parsed });
      } catch {
        console.error("Failed to parse user data from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
