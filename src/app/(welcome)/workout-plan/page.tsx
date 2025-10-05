import Image from "next/image";
import React from "react";

const WorkoutPlan = () => {
  return (
    <div className="absolute z-0">
      <div className="z-10 flex flex-col justify-center items-center w-screen h-screen bg-[linear-gradient(180deg,rgba(17,18,20,0)_0%,#111214_100%)] text-center">
        <h1 className="mt-8 mb-2 w-86 peyda-bold text-4xl">برنامه‌های ورزشی خود را شخصی کنید.</h1>
        <p className="mt-2 peyda-regular text-base">نوشته آزمایشی میباشد.</p>
      </div>
    </div>
  );
};

export default WorkoutPlan;
