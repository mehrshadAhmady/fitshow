import React from "react";
import StartTestImage from "@/assets/images/StartTestImage.png";
import Image from "next/image";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import Button from "@/components/Button";

const StartTest = () => {
  return (
    <div className="flex flex-col items-center w-screen h-screen bg-secondary text-secondary">
      <Image
        src={StartTestImage}
        alt="start-test-image"
        width={183}
        height={243}
        className="mt-20"
      />
      <h1 className="mt-4 peyda-bold text-xl sm:text-2xl lg:text-3xl">نوشته آزمایشی توضیحات تست</h1>
      <p className="mt-4 w-[21.5rem] peyda-medium text-xs text-center sm:text-sm lg:text-base">
        نوشته آزمایشی توضیحات تست نوشته آزمایشی توضیحات تستنوشته آزمایشی توضیحات
        تست نوشته آزمایشی توضیحات تست
      </p>
      <Link href={"/workout-plan"} className="mt-4 peyda-semibold text-lg rounded-[1.25rem]">
        <Button iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />} className="w-44 h-16 rounded-[1.25rem] gap-2">
          شروع تست
        </Button>
      </Link>
      <p className="mt-auto mb-8 peyda-medium text-sm">
        تمامی حقوق متعلق به ایکس می‌باشد.
      </p>
    </div>
  );
};

export default StartTest;
