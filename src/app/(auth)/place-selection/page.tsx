"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PlaceSelectionImage from "@/assets/images/PlaceSelectionImage.png";
import Image from "next/image";

const PlaceSelection = () => {
  const router = useRouter();
  const [place, setPlace] = useState<"home" | "gym">("home");

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 peyda-bold text-base text-center">
        برنامه تمرین در خانه می‌خواهید یا برنامه باشگاهی؟
      </h3>
      <Image
        src={PlaceSelectionImage}
        alt="place-selection-image"
        width={193}
        height={193}
      />
      <div
        onClick={() => {
          setPlace("home");
        }}
        className={`relative flex flex-col items-end justify-between mt-10 bg-[#F3F3F4] w-[90%] h-15 rounded-2xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          place === "home" && "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <div className="absolute w-full h-full flex justify-between items-center">
          <p className="mr-4 peyda-semibold text-sm">تمرین در منزل </p>
          <div
            className={`flex justify-center items-center ml-4 w-6 h-6 rounded-lg border-2 ${
              place === "home" ? "border-white" : "border-black"
            }`}
          >
            {place === "home" && (
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setPlace("gym");
        }}
        className={`relative flex flex-col items-end justify-between mt-4 bg-[#F3F3F4] w-[90%] h-15 rounded-2xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          place === "gym" && "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <div className="absolute w-full h-full flex justify-between items-center">
          <p className="mr-4 peyda-semibold text-sm">تمرین در باشگاه </p>
          <div
            className={`flex justify-center items-center ml-4 w-6 h-6 rounded-lg border-2 ${
              place === "gym" ? "border-white" : "border-black"
            }`}
          >
            {place === "gym" && (
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={() => {
          router.push("/health-conditions");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default PlaceSelection;
