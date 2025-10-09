import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import { ArrowRight02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUserContext } from "@/context/userContext";
import { useEffect, useTransition } from "react";

import { createUser } from "../../actions";

interface Plan {
  id: number;
  title: string;
  price: string;
  oldMonthlyPrice: string;
  oldPrice: string;
  discount?: string;
  highlighted?: boolean;
  duration: "1-month" | "6-months" | "12-months";
}

interface PlanCardProps {
  plan: Plan;
  isActive: boolean;
}

const PlanCard = ({ plan, isActive }: PlanCardProps) => {
  const router = useRouter();
  const { user, updateUser } = useUserContext();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div
      key={plan.id}
      className="flex justify-center items-center transition-all -mr-2 duration-500 ease-in-out"
    >
      <div
        className={cn(
          "rounded-[2rem] flex flex-col justify-center items-center text-center w-[19rem] h-[22rem] transition-all duration-500 ease-in-out",
          plan.highlighted
            ? "bg-[#FF7E25CF] text-white shadow-[0_0_0_4px_#F9731640]"
            : "bg-[#F3F3F4] text-black",
          isActive
            ? "scale-98 opacity-100 blur-0 z-20"
            : "scale-90 opacity-70 blur-[0.125rem] z-10"
        )}
      >
        {plan.discount && (
          <div
            className="flex justify-center items-center mt-8 peyda-light font-semibold button-bg-primary rounded-[0.625rem] w-26 h-8"
            style={{ direction: "rtl" }}
          >
            {plan.discount}
          </div>
        )}
        <h3
          className={`mt-${
            plan.highlighted ? "4" : "10"
          } peyda-semibold text-2xl`}
        >
          {plan.title}
        </h3>
        <p className="mt-4 peyda-medium text-lg" style={{ direction: "rtl" }}>
          {plan.price}
        </p>
        <div className="mt-4 w-[80%] h-0.25 bg-[#3F3F3F] opacity-20"></div>
        <div className="flex justify-center items-center gap-2 mt-4">
          <p
            className={cn(
              "peyda-light opacity-80",
              `${!plan.highlighted && "text-[#AEAEAE]"}`
            )}
          >
            {plan.oldMonthlyPrice}
          </p>
          <div className="flex justify-center items-center bg-primary w-5 h-5 rounded-full">
            <HugeiconsIcon
              icon={Tick02Icon}
              width={8}
              height={8}
              color="black"
            />
          </div>
        </div>
        <p
          className={cn(
            "mt-2 peyda-light opacity-80",
            `${!plan.highlighted && "text-[#AEAEAE]"}`
          )}
          style={{ direction: "rtl" }}
        >
          {plan.oldPrice}
        </p>
        <Button
          color="primary"
          style={{ direction: "rtl" }}
          iconPrefix={
            <HugeiconsIcon icon={ArrowRight02Icon} width={14} height={14} />
          }
          className="mt-auto mb-8 w-30 h-12 gap-1 rounded-2xl text-sm font-semibold transition duration-300"
          onClick={async () => {
            updateUser({ userPlan: plan.duration });
            startTransition(async () => {
              await createUser({ ...user, userPlan: plan.duration });
              router.push("/result-plan");
            });
          }}
        >
          <p className="-mt-1">پرداخت</p>
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
