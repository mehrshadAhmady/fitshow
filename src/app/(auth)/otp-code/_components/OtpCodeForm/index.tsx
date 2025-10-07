"use client";

import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import Form from "@/components/Form";
import OtpInput from "react-otp-input";
import { ArrowRight02Icon, ReloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// --- validation schemas

const otpSchema = z.object({
  otpCode: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

//
// AuthForm Component
export default function OtpCodeForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit: handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<{ otpCode: string }>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otpCode: "" },
  });

  const onSubmit = ({ otpCode }: { otpCode: string }) => {
    console.log(otpCode);
    router.push("/gender-selection");
  };

  return (
    <div className="absolute bottom-0 top-40 w-full mt-10 flex justify-center items-center">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col h-full w-[90%]"
        style={{ direction: "ltr" }}
      >
        <Controller
          name="otpCode"
          control={control}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              numInputs={4}
              renderSeparator={<span className="w-[25%]"></span>}
              renderInput={(props) => {
                const isEmpty = !String(props.value).trim();

                return (
                  <input
                    {...props}
                    className={`flex justify-center items-center text-center mt-16 mb-10 rounded-2xl w-16 h-18 focus:outline-0 transition-colors inter-medium text-[1.75rem]
                      ${
                        isEmpty
                          ? "bg-[#F9731640]"
                          : "input-bg-primary text-white"
                      }
                    `}
                    disabled={isSubmitting}
                  />
                );
              }}
              skipDefaultStyles
              shouldAutoFocus
            />
          )}
        />
        {errors.otpCode && (
          <p className="text-red-500 text-xs peyda-regular -mt-6 ml-2">
            {errors.otpCode.message}
          </p>
        )}
        <Button
          type="submit"
          color="primary"
          className="mt-auto mb-2 gap-3 h-14 rounded-[1.25rem] peyda-semibold"
          iconPrefix={<HugeiconsIcon icon={ReloadIcon} />}
          style={{ direction: "rtl" }}
        >
          {isSubmitting ? <HugeiconsIcon icon={ReloadIcon} /> : "ارسال مجدد"}
        </Button>
        <Button
          type="submit"
          color="black"
          className="mb-10 gap-3 h-14 rounded-[1.25rem] peyda-semibold"
          iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
          disabled={isSubmitting || !isValid}
          style={{ direction: "rtl" }}
        >
          {isSubmitting ? <Spinner /> : "ادامه"}
        </Button>
      </Form>
    </div>
  );
}
