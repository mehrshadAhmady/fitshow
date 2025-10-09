"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import WeightPicker from "./_components/WeightPicker";
import { useUserContext } from "@/context/userContext";
import { useLocalUser } from "@/hooks/useLocalUser";

const IdealWeight = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [weight, setWeight] = useState(80);
  const { localUser, loading } = useLocalUser();

  useEffect(() => {
    if (!loading && localUser?.idealWeight) {
      setWeight(localUser.idealWeight);
    }
  }, [loading, localUser]);

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 mb-10 w-80 peyda-bold text-base text-center">
        وزن ایده‌آلی که هدف شماست چقدره؟
      </h3>
      <div className="flex flex-row-reverse items-end mt-4 mb-4">
        <p
          className="text-8xl font-bold worksans-bold"
          style={{ direction: "ltr" }}
        >
          {weight}
        </p>
        <p className="text-[#676C75] text-4xl worksans-medium">kg</p>
      </div>
      <div className="w-[90%]">
        <WeightPicker
          value={weight}
          setValue={setWeight}
          min={30}
          max={150}
          step={0.2}
        />
      </div>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await updateUser({ idealWeight: weight });
          router.push("/age-selection");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default IdealWeight;
