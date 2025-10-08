"use client";

import { useEffect, useState } from "react";
import type { User } from "@/context/userContext";

const STORAGE_KEY = "user_data";

export function useLocalUser() {
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: User = JSON.parse(saved);
        setLocalUser(parsed);
      } else {
        setLocalUser(null);
      }
    } catch (err) {
      console.error("Failed to read user_data from localStorage:", err);
      setLocalUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { localUser, loading };
}
