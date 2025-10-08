"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserContext } from "@/context/userContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUser = localStorage.getItem("user_data");
    const parsed = savedUser ? JSON.parse(savedUser) : null;

    // Rule 1: OTP page protection
    if (pathname === "/otp-code" && parsed.phoneNumber === "") {
      router.replace("/phone-number");
      return;
    } else if (pathname !== "/otp-code" && !parsed.verified) {
      router.replace("/phone-number");
      return;
    }
  }, [router]);

  return <>{children}</>;
}
