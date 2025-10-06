"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import {
  ArrowRight02Icon,
  MultiplicationSignIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const DietOptions = () => {
  const router = useRouter();
  const [isDiet, setIsDiet] = useState(false);

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-80 peyda-bold text-base text-center">
        آیا برنامه غذایی می‌خواهید؟
      </h3>
      <div className="flex justify-between items-center mt-auto mb-10 w-[90%]">
        <Button
          iconPrefix={<HugeiconsIcon icon={Tick02Icon} />}
          color="black"
          className="gap-3 h-14 w-[48%] rounded-[1.25rem] peyda-semibold"
          onClick={async () => {
            await setIsDiet(true);
            router.push("/interest-sport");
          }}
        >
          بله
        </Button>
        <Button
          iconPrefix={
            <HugeiconsIcon icon={MultiplicationSignIcon} color="#9EA0A5" />
          }
          color="secondary"
          className="gap-3 h-14 w-[48%] rounded-[1.25rem] peyda-semibold"
          onClick={async () => {
            await setIsDiet(false);
            router.push("/interest-sport");
          }}
        >
          <p className="text-[#9EA0A5]">خیر</p>
        </Button>
      </div>
    </div>
  );
};

export default DietOptions;
