"use client";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import Header from "./_components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  const isStartTestPage = pathname === "/start-test";

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <Header />
      {children}
    </div>
  );
}
