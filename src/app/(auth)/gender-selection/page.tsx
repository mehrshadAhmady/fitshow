"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import { useUserContext } from "@/context/userContext";

import { ArrowRight02Icon, MaleSymbolIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import MaleSelectionImage from "@/assets/images/MaleSelectionImage.png";
import FemaleSelectionImage from "@/assets/images/FemaleSelectionImage.png";

const GenderSelection = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [gender, setGender] = useState<"male" | "female">("male");

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-70 peyda-bold text-base text-center">
        جنسیت خود را انتخاب کنید.
      </h3>
      <div
        onClick={() => {
          setGender("male");
        }}
        className={`relative flex flex-col items-end justify-between mt-10 bg-[#F3F3F4] w-[90%] h-36 rounded-4xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          gender === "male" &&
          "border-2 border-[#F97316] shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <Image
          src={MaleSelectionImage}
          alt="male-selection-image"
          className="absolute z-0 h-full"
        />
        <div className="absolute w-full h-full flex flex-col items-end justify-between">
          <div className="flex items-center justify-center gap-2 ml-4 mt-4">
            <p className="peyda-semibold">آقا</p>
            <HugeiconsIcon icon={MaleSymbolIcon} width={24} hanging={24} />
          </div>
          <div className="flex justify-center items-center ml-4 mb-4 w-6 h-6 rounded-lg border-2 border-black">
            {gender === "male" && (
              <div className="w-3 h-3 bg-black rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setGender("female");
        }}
        className={`relative flex flex-col items-end justify-between mt-4 bg-[#F3F3F4] w-[90%] h-36 rounded-4xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          gender === "female" &&
          "border-2 border-[#F97316] shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <Image
          src={FemaleSelectionImage}
          alt="female-selection-image"
          className="absolute z-0 h-full"
        />
        <div className="absolute w-full h-full flex flex-col items-end justify-between">
          <div className="flex items-center justify-center gap-2 ml-4 mt-4">
            <p className="peyda-semibold">خانم</p>
            <HugeiconsIcon icon={MaleSymbolIcon} width={24} hanging={24} />
          </div>
          <div className="flex justify-center items-center ml-4 mb-4 w-6 h-6 rounded-lg border-2 border-black">
            {gender === "female" && (
              <div className="w-3 h-3 bg-black rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await updateUser({ gender: gender });
          router.push("/goal-selection");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default GenderSelection;
