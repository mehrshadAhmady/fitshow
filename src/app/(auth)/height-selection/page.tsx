"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import HeightPicker from "./_components/HeightPicker";

const HeightSelection = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(172);

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 mb-10 w-80 peyda-bold text-base text-center">
        قد شما چقدر است؟
      </h3>
      <HeightPicker setData={(number: number) => setSelected(number)} data={selected} />
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await console.log(selected);
          router.push("/weight-selection");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default HeightSelection;
