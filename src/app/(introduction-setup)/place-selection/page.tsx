"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useUserContext } from "@/context/userContext";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PlaceSelectionImage from "@/assets/images/PlaceSelectionImage.png";
import Image from "next/image";
import Checkbox from "@/components/CheckBox";
import { useLocalUser } from "@/hooks/useLocalUser";

const PlaceSelection = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [place, setPlace] = useState<"home" | "gym">("home");
  const { localUser, loading } = useLocalUser();

  useEffect(() => {
    if (!loading && localUser?.workoutPlace) {
      setPlace(localUser.workoutPlace);
    }
  }, [loading, localUser]);

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
        className="my-4 lg:w-[250px] lg:h-[250px]"
      />
      <Checkbox
        label="تمرین در منزل"
        checked={place === "home"}
        onChange={() => setPlace("home")}
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-15"
        block
      />
      <Checkbox
        label="تمرین در باشگاه"
        checked={place === "gym"}
        onChange={() => setPlace("gym")}
        color="primary"
        boxSize="medium"
        className="mt-4 w-[90%] h-15"
        block
      />
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await updateUser({ workoutPlace: place });
          router.push("/health-condition");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default PlaceSelection;
