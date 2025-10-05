"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import {
  ArrowRight02Icon,
  BodyPartMuscleIcon,
  Dumbbell02Icon,
  SmartPhone01Icon,
  WeightScaleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const GoalSelection = () => {
  const router = useRouter();
  const [goal, setGoal] = useState<
    "lose-weight" | "increase-strength" | "bulk" | "try-test"
  >("lose-weight");

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-70 peyda-bold text-base text-center">
        هدف ورزشی شما چیست؟
      </h3>
      <div
        onClick={() => {
          setGoal("lose-weight");
        }}
        className={`relative flex flex-col items-end justify-between mt-10 bg-[#F3F3F4] w-[90%] h-13 rounded-4xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          goal === "lose-weight" &&
          "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <div className="absolute w-full h-full flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 mr-4">
            <HugeiconsIcon
              icon={WeightScaleIcon}
              width={18}
              height={18}
              color={goal === "lose-weight" ? "white" : "#676C75"}
            />
            <p className="peyda-semibold text-sm">می‌خوام وزن کم کنم</p>
          </div>
          <div
            className={`flex justify-center items-center ml-4 w-6 h-6 rounded-lg border-2 ${
              goal === "lose-weight" ? "border-white" : "border-black"
            }`}
          >
            {goal === "lose-weight" && (
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setGoal("increase-strength");
        }}
        className={`relative flex flex-col items-end justify-between mt-4 bg-[#F3F3F4] w-[90%] h-13 rounded-4xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          goal === "increase-strength" &&
          "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <div className="absolute w-full h-full flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 mr-4">
            <HugeiconsIcon
              icon={BodyPartMuscleIcon}
              width={18}
              height={18}
              color={goal === "increase-strength" ? "white" : "#676C75"}
            />
            <p className="peyda-semibold text-sm">
              می‌خوام استقامتم رو افزایش بدم
            </p>
          </div>
          <div
            className={`flex justify-center items-center ml-4 w-6 h-6 rounded-lg border-2 ${
              goal === "increase-strength" ? "border-white" : "border-black"
            }`}
          >
            {goal === "increase-strength" && (
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setGoal("bulk");
        }}
        className={`relative flex flex-col items-end justify-between mt-4 bg-[#F3F3F4] w-[90%] h-13 rounded-4xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          goal === "bulk" && "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <div className="absolute w-full h-full flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 mr-4">
            <HugeiconsIcon
              icon={Dumbbell02Icon}
              width={18}
              height={18}
              color={goal === "bulk" ? "white" : "#676C75"}
            />
            <p className="peyda-semibold text-sm">می‌خوام حجم بگیرم</p>
          </div>
          <div
            className={`flex justify-center items-center ml-4 w-6 h-6 rounded-lg border-2 ${
              goal === "bulk" ? "border-white" : "border-black"
            }`}
          >
            {goal === "bulk" && (
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setGoal("try-test");
        }}
        className={`relative flex flex-col items-end justify-between mt-4 bg-[#F3F3F4] w-[90%] h-13 rounded-4xl overflow-hidden cursor-pointer hover:opacity-70 transition duration-300 ${
          goal === "try-test" &&
          "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
        }`}
      >
        <div className="absolute w-full h-full flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 mr-4">
            <HugeiconsIcon
              icon={SmartPhone01Icon}
              width={18}
              height={18}
              color={goal === "try-test" ? "white" : "#676C75"}
            />
            <p className="peyda-semibold text-sm">دارم تست رو امتحان می‌کنم!</p>
          </div>
          <div
            className={`flex justify-center items-center ml-4 w-6 h-6 rounded-lg border-2 ${
              goal === "try-test" ? "border-white" : "border-black"
            }`}
          >
            {goal === "try-test" && (
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
          router.push("/workout-days");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default GoalSelection;
