"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import HeightPicker from "./_components/HeightPicker";
import { useUserContext } from "@/context/userContext";
import { useLocalUser } from "@/hooks/useLocalUser";

const HeightSelection = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const { localUser, loading } = useLocalUser();

  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);

  // ✅ Wait for localUser to load, then initialize
  useEffect(() => {
    if (!loading) {
      if (localUser?.height) {
        setSelectedHeight(localUser.height);
      } else {
        setSelectedHeight(172); // fallback default
      }
    }
  }, [loading, localUser?.height]);

  // Still loading user data? show loading state
  if (loading || selectedHeight === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 peyda-light">در حال بارگذاری...</p>
      </div>
    );
  }

  const handleNext = async () => {
    await updateUser({ height: selectedHeight });
    router.push("/weight-selection");
  };

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 mb-10 w-80 peyda-bold text-base text-center lg:mb-20">
        قد شما چقدر است؟
      </h3>

      <HeightPicker
        setData={(number: number) => setSelectedHeight(number)}
        data={selectedHeight}
      />

      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={handleNext}
      >
        ادامه
      </Button>
    </div>
  );
};

export default HeightSelection;
