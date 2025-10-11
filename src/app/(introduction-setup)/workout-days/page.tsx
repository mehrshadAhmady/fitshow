"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { useUserContext } from "@/context/userContext";
import { useLocalUser } from "@/hooks/useLocalUser";

const GoalSelection = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [workoutDays, setWorkoutDays] = useState(1);
  const { localUser, loading } = useLocalUser();

  useEffect(() => {
    if (!loading && localUser?.workoutDays) {
      setWorkoutDays(localUser.workoutDays);
    }
  }, [loading, localUser]);

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-80 peyda-bold text-base text-center">
        چند روز از هفته را به ورزش اختصاص می‌دهید؟
      </h3>
      <h1 className="mt-20 text-[4rem] worksans-extrabold lg:text-[10rem]">{workoutDays}</h1>
      <div className="flex justify-evenly items-center mt-auto mb-4 w-[90%] max-w-[21.125rem] h-18 rounded-[1.875rem] bg-[#F3F3F4]">
        <div
          onClick={() => {
            setWorkoutDays(1);
          }}
          className={`flex justify-center items-center w-14 h-14 rounded-[1.5rem] cursor-pointer hover:opacity-80 worksans-bold text-[1.25rem] ${
            workoutDays === 1 ? "text-white" : "text-[#BABBBE]"
          } ${
            workoutDays === 1 &&
            "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
          }`}
        >
          1
        </div>
        <div
          onClick={() => {
            setWorkoutDays(2);
          }}
          className={`flex justify-center items-center w-14 h-14 rounded-[1.5rem] cursor-pointer hover:opacity-80 worksans-bold text-[1.25rem] ${
            workoutDays === 2 ? "text-white" : "text-[#BABBBE]"
          } ${
            workoutDays === 2 &&
            "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
          }`}
        >
          2
        </div>
        <div
          onClick={() => {
            setWorkoutDays(3);
          }}
          className={`flex justify-center items-center w-14 h-14 rounded-[1.5rem] cursor-pointer hover:opacity-80 worksans-bold text-[1.25rem] ${
            workoutDays === 3 ? "text-white" : "text-[#BABBBE]"
          } ${
            workoutDays === 3 &&
            "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
          }`}
        >
          3
        </div>
        <div
          onClick={() => {
            setWorkoutDays(4);
          }}
          className={`flex justify-center items-center w-14 h-14 rounded-[1.5rem] cursor-pointer hover:opacity-80 worksans-bold text-[1.25rem] ${
            workoutDays === 4 ? "text-white" : "text-[#BABBBE]"
          } ${
            workoutDays === 4 &&
            "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
          }`}
        >
          4
        </div>
        <div
          onClick={() => {
            setWorkoutDays(5);
          }}
          className={`flex justify-center items-center w-14 h-14 rounded-[1.5rem] cursor-pointer hover:opacity-80 worksans-bold text-[1.25rem] ${
            workoutDays === 5 ? "text-white" : "text-[#BABBBE]"
          } ${
            workoutDays === 5 &&
            "button-bg-primary shadow-[0_0_0_4px_#F9731640]"
          }`}
        >
          5
        </div>
      </div>
      <p className="mb-10 peyda-medium">
        من متعهد هستم که {workoutDays} بار در هفته ورزش کنم
      </p>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await updateUser({ workoutDays: workoutDays });
          router.push("/place-selection");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default GoalSelection;
