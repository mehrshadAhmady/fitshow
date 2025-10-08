"use client";
import { usePathname } from "next/navigation";
import Header from "./_components/Header";
import { UserProvider } from "@/context/userContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isResultPage = pathname === "/result-plan";

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      {!isResultPage && <Header />}
      <UserProvider>{children}</UserProvider>
    </div>
  );
}
