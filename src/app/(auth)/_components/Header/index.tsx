"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const Header = () => {
  const router = useRouter();
  return (
    <div
      style={{ direction: "ltr" }}
      className="flex justify-between mt-10 w-full z-50"
    >
      <div
        className="flex flex-col items-center justify-center ml-[5%] w-10 h-7 bg-[#F3F3F4] rounded-xl cursor-pointer hover:opacity-80"
        onClick={() => {
          router.back();
          console.log("first");
        }}
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} width={21} height={21} />
      </div>
      <div className="flex flex-col items-center justify-center mr-[5%] w-15 h-7 bg-[#DBEAFE] rounded-xl text-[#2563EB] text-sm">
        1 of 17
      </div>
    </div>
  );
};

export default Header;
