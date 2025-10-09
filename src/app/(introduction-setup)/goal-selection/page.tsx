"use client";

import { useEffect, useState } from "react";
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
import Checkbox from "@/components/CheckBox";
import { useUserContext } from "@/context/userContext";
import { useLocalUser } from "@/hooks/useLocalUser";

const GoalSelection = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [goal, setGoal] = useState<
    "lose-weight" | "increase-strength" | "bulk" | "try-test"
  >("lose-weight");
  const { localUser, loading } = useLocalUser();

  useEffect(() => {
    if (!loading && localUser?.workoutGoal) {
      setGoal(localUser.workoutGoal);
    }
  }, [loading, localUser]);

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-70 peyda-bold text-base text-center">
        هدف ورزشی شما چیست؟
      </h3>
      <Checkbox
        label="می‌خوام وزن کم کنم"
        checked={goal === "lose-weight"}
        onChange={() => setGoal("lose-weight")}
        iconPrefix={
          <HugeiconsIcon
            icon={WeightScaleIcon}
            width={18}
            height={18}
            color={goal === "lose-weight" ? "white" : "#676C75"}
          />
        }
        color="primary"
        boxSize="medium"
        className="mt-10 w-[90%] h-13 rounded-4xl"
        block
      />
      <Checkbox
        label="می‌خوام استقامتم رو افزایش بدم"
        checked={goal === "increase-strength"}
        onChange={() => setGoal("increase-strength")}
        iconPrefix={
          <HugeiconsIcon
            icon={BodyPartMuscleIcon}
            width={18}
            height={18}
            color={goal === "increase-strength" ? "white" : "#676C75"}
          />
        }
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-13 rounded-4xl"
        block
      />
      <Checkbox
        label="می‌خوام حجم بگیرم"
        checked={goal === "bulk"}
        onChange={() => setGoal("bulk")}
        iconPrefix={
          <HugeiconsIcon
            icon={Dumbbell02Icon}
            width={18}
            height={18}
            color={goal === "bulk" ? "white" : "#676C75"}
          />
        }
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-13 rounded-4xl"
        block
      />
      <Checkbox
        label="دارم تست رو امتحان می‌کنم!"
        checked={goal === "try-test"}
        onChange={() => setGoal("try-test")}
        iconPrefix={
          <HugeiconsIcon
            icon={SmartPhone01Icon}
            width={18}
            height={18}
            color={goal === "try-test" ? "white" : "#676C75"}
          />
        }
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-13 rounded-4xl"
        block
      />
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await updateUser({ workoutGoal: goal });
          router.push("/workout-days");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default GoalSelection;
