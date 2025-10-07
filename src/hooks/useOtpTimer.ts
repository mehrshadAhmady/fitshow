import { useEffect, useState } from "react";

const OTP_DURATION = 2 * 60 * 1000; // 2 minutes in ms
const STORAGE_KEY = "otp_sended_at";

export function useOtpTimer() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTime = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (savedTime) {
      const elapsed = now - Number(savedTime);
      if (elapsed < OTP_DURATION) {
        setRemaining(OTP_DURATION - elapsed);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining]);

  const startTimer = () => {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, String(now));
    setRemaining(OTP_DURATION);
  };

  // New: Auto start timer if not already started
  const autoStartTimer = () => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      startTimer();
    }
  };

  const isRunning = remaining > 0;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formattedTime = formatTime(remaining);

  return { isRunning, formattedTime, startTimer, autoStartTimer };
}
