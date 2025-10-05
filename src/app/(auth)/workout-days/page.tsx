"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const GoalSelection = () => {
  const router = useRouter();

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-70 peyda-bold text-base text-center">
        هدف ورزشی شما چیست؟
      </h3>
      
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={() => {
          router.push("/workout-days");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default GoalSelection;
