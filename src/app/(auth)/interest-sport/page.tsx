"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import HikingImage from "@/assets/images/HikingImage.png";
import TrxImage from "@/assets/images/TrxImage.png";
import RunningImage from "@/assets/images/RunningImage.png";
import BodyBuildingImage from "@/assets/images/BodyBuildingImage.png";
import BikingImage from "@/assets/images/BikingImage.png";
import SkatingImage from "@/assets/images/SkatingImage.png";
import Image from "next/image";
import { useUserContext } from "@/context/userContext";

type Interests =
  | "running"
  | "trx"
  | "hiking"
  | "skating"
  | "biking"
  | "body-builing";

const InterestSport = () => {
  const router = useRouter();
  const { updateUser } = useUserContext();
  const [interest, setInterest] = useState<Interests>("running");

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-80 peyda-bold text-base text-center">
        به چه نوع ورزشی بیشتر علاقه‌مندید؟
      </h3>
      <div className="grid grid-cols-3 gap-x-3 gap-y-3 w-[90%] mx-auto mt-14">
        <div
          className={`flex flex-col items-center justify-evenly  h-32 rounded-3xl button-bg-${
            interest === "hiking"
              ? "primary  shadow-[0_0_0_4px_#F9731640]"
              : "secondary"
          } cursor-pointer hover:opacity-70 duration-300`}
          onClick={() => {
            setInterest("hiking");
          }}
        >
          <Image
            src={HikingImage}
            alt="hiking-image"
            width={48}
            height={48}
            className={`${interest === "hiking" && "brightness-500"}`}
          />
          <p
            className={`peyda-medium tracking-tigh text-[#${
              interest === "hiking" ? "ffffff" : "676C75"
            }]`}
          >
            سطح دو
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-evenly  h-32 rounded-3xl button-bg-${
            interest === "trx"
              ? "primary  shadow-[0_0_0_4px_#F9731640]"
              : "secondary"
          } cursor-pointer hover:opacity-70 duration-300`}
          onClick={() => {
            setInterest("trx");
          }}
        >
          <Image
            src={TrxImage}
            alt="trx-image"
            width={48}
            height={48}
            className={`${interest === "trx" && "brightness-500"}`}
          />
          <p
            className={`peyda-medium tracking-tight text-[#${
              interest === "trx" ? "ffffff" : "676C75"
            }]`}
          >
            تی آر ایکس
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-evenly  h-32 rounded-3xl button-bg-${
            interest === "running"
              ? "primary  shadow-[0_0_0_4px_#F9731640]"
              : "secondary"
          } cursor-pointer hover:opacity-70 duration-300`}
          onClick={() => {
            setInterest("running");
          }}
        >
          <Image
            src={RunningImage}
            alt="running-image"
            width={48}
            height={48}
            className={`${interest === "running" && "brightness-500"}`}
          />
          <p
            className={`peyda-medium tracking-tight text-[#${
              interest === "running" ? "ffffff" : "676C75"
            }]`}
          >
            دویدن
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-evenly  h-32 rounded-3xl button-bg-${
            interest === "body-builing"
              ? "primary  shadow-[0_0_0_4px_#F9731640]"
              : "secondary"
          } cursor-pointer hover:opacity-70 duration-300`}
          onClick={() => {
            setInterest("body-builing");
          }}
        >
          <Image
            src={BodyBuildingImage}
            alt="body-builing-image"
            width={48}
            height={48}
            className={`${interest !== "body-builing" && "brightness-80"}`}
          />
          <p
            className={`peyda-medium tracking-tight text-[#${
              interest === "body-builing" ? "ffffff" : "676C75"
            }]`}
          >
            بدنسازی
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-evenly  h-32 rounded-3xl button-bg-${
            interest === "biking"
              ? "primary  shadow-[0_0_0_4px_#F9731640]"
              : "secondary"
          } cursor-pointer hover:opacity-70 duration-300`}
          onClick={() => {
            setInterest("biking");
          }}
        >
          <Image
            src={BikingImage}
            alt="biking-image"
            width={48}
            height={48}
            className={`${interest === "biking" && "brightness-500"}`}
          />
          <p
            className={`peyda-medium tracking-tight text-[#${
              interest === "biking" ? "ffffff" : "676C75"
            }]`}
          >
            دوچرخه سواری
          </p>
        </div>
        <div
          className={`flex flex-col items-center justify-evenly  h-32 rounded-3xl button-bg-${
            interest === "skating"
              ? "primary  shadow-[0_0_0_4px_#F9731640]"
              : "secondary"
          } cursor-pointer hover:opacity-70 duration-300`}
          onClick={() => {
            setInterest("skating");
          }}
        >
          <Image
            src={SkatingImage}
            alt="skating-image"
            width={48}
            height={48}
            className={`${interest === "skating" && "brightness-500"}`}
          />
          <p
            className={`peyda-medium text-[#${
              interest === "skating" ? "ffffff" : "676C75"
            }]`}
          >
            اسکیت
          </p>
        </div>
      </div>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="mt-auto mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={async () => {
          await updateUser({ interestSport: interest });
          router.push("/subscription");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default InterestSport;
