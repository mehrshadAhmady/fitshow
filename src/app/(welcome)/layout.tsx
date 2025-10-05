"use client";
import Button from "@/components/Button";
import ProgressionBar from "@/components/ProgressionBar";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname, useRouter } from "next/navigation";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const onboardingPages = [
    "/start-test",
    "/workout-plan",
    "/practice-set",
    "/standards-analysis",
    "/nutrition-guide",
    "/virtual-training",
  ];
  const currentIndex = onboardingPages.indexOf(pathname);
  const isStartTestPage = pathname === "/start-test";

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      {!isStartTestPage && (
        <div className="z-20 mt-10 h-2 w-54 ">
          <ProgressionBar value={currentIndex} max={5} />
        </div>
      )}
      {children}
      {!isStartTestPage && (
        <div className="flex gap-4 z-20 mt-auto mb-10">
          <Button
            iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
            color="secondary"
            className="flex justify-center items-center w-40 h-24 rounded-4xl cursor-pointer hover:opacity-80"
            onClick={() => {
              if (currentIndex < onboardingPages.length - 1) {
                router.push(onboardingPages[currentIndex + 1]);
              } else {
                router.push("/phone-number");
              }
            }}
          ></Button>
          <Button
            iconPrefix={<HugeiconsIcon icon={ArrowLeft02Icon} />}
            color="secondary"
            className="flex justify-center items-center w-40 h-24 rounded-4xl cursor-pointer hover:opacity-80"
            onClick={() => {
              if (currentIndex > 0) {
                router.push(onboardingPages[currentIndex - 1]);
              }
            }}
          ></Button>
        </div>
      )}
    </div>
  );
}
