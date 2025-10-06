"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import BodyFormImage from "@/assets/images/BodyFormImage.png";
import Image from "next/image";

const BodyForm = () => {
  const router = useRouter();
  const [bodyForm, setBodyForm] = useState<"thin" | "obese">("thin");

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-80 peyda-bold text-base text-center">
        بیشتر شبیه به کدوم تصویر هستی؟
      </h3>
      <div className="flex justify-between items-center mt-20 w-[90%]">
        <div className="flex flex-col items-center justify-between w-[48%]">
          <Image src={BodyFormImage} alt="body-form-image" />
          <Checkbox
            label="عضلات باریک شکم کمی برجسته"
            checked={bodyForm === "obese"}
            onChange={() => setBodyForm("obese")}
            color="primary"
            boxSize="small"
            textSize="small"
            className="mt-4 w-full h-16"
          />
        </div>
        <div className="flex flex-col items-center justify-between w-[48%]">
          <Image src={BodyFormImage} alt="body-form-image" />
          <Checkbox
            label="عضلات باریک شکم تخت"
            checked={bodyForm === "thin"}
            onChange={() => setBodyForm("thin")}
            boxSize="small"
            textSize="small"
            className="mt-4 w-full h-16"
          />
        </div>
      </div>

      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={() => {
          console.log(bodyForm);
          router.push("/upload");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default BodyForm;
