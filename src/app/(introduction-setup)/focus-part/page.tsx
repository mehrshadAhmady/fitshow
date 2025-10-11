"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Checkbox from "@/components/CheckBox";
import { useUserContext } from "@/context/userContext";
import { useLocalUser } from "@/hooks/useLocalUser";

const FocusPart = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [bodyPart, setBodyPart] = useState<string[]>([]);
  const { localUser, loading } = useLocalUser();

  useEffect(() => {
    if (!loading && localUser?.focusPart) {
      setBodyPart(localUser.focusPart);
    }
  }, [loading, localUser]);

  const toggleBodyPart = (part: string) => {
    setBodyPart((prev) =>
      prev.includes(part)
        ? prev.filter((item) => item !== part)
        : [...prev, part]
    );
  };

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-[90%] peyda-bold text-base text-center">
        روی کدوم قسمت بدنت می‌خوای تمرکز بیشتری داشته باشی؟
      </h3>
      <Checkbox
        label="شکم"
        checked={bodyPart.includes("belly")}
        onChange={() => toggleBodyPart("belly")}
        color="primary"
        boxSize="medium"
        className="mt-10 w-[90%] h-14"
        block
      />
      <Checkbox
        label="بازوها"
        checked={bodyPart.includes("arms")}
        onChange={() => toggleBodyPart("arms")}
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-14"
        block
      />
      <Checkbox
        label="سینه"
        checked={bodyPart.includes("chest")}
        onChange={() => toggleBodyPart("chest")}
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-14"
        block
      />
      <Checkbox
        label="باسن"
        checked={bodyPart.includes("hips")}
        onChange={() => toggleBodyPart("hips")}
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-14"
        block
      />
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        disabled={!bodyPart.length}
        onClick={async () => {
          await updateUser({ focusPart: bodyPart });
          router.push("/height-selection");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default FocusPart;
