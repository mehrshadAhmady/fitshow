"use client";

import { useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "@/components/TextInput";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

// schema validations
const birthdaySchema = z
  .object({
    day: z
      .string()
      .regex(/^\d{1,2}$/, "روز باید بین 01 تا 31 باشد")
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 1 && val <= 31, {
        message: "روز باید بین 1 تا 31 باشد",
      }),
    month: z
      .string()
      .regex(/^\d{1,2}$/, "ماه باید بین 01 تا 12 باشد")
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 1 && val <= 12, {
        message: "ماه باید بین 1 تا 12 باشد",
      }),
    year: z
      .string()
      .regex(/^\d{4}$/, "سال باید شامل 4 رقم باشد")
      .transform((val) => parseInt(val, 10)),
  })
  // ❗ validation safety
  .refine((data) => !(data.month >= 7 && data.month <= 12 && data.day === 31), {
    message: "ماه‌های ۷ تا ۱۲ دارای ۳۱ روز نیستند",
    path: ["day"],
  });

type BirthdayFormData = z.infer<typeof birthdaySchema>;

export default function BirthdayForm() {
  const router = useRouter();
  const dayRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dayRef.current?.focus();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(birthdaySchema),
    defaultValues: { day: "", month: "", year: "" },
  });

  const dayValue = useWatch({ control, name: "day" });
  const monthValue = useWatch({ control, name: "month" });

  // ✅ Reactively adjust day if user changes month to >=7 after entering 31
  useEffect(() => {
    const dayNum = parseInt(dayValue || "0", 10);
    const monthNum = parseInt(monthValue || "0", 10);

    if (monthNum >= 7 && monthNum <= 12 && dayNum === 31) {
      setValue("day", "30"); // auto correct
    }
  }, [monthValue, dayValue, setValue]);

  const padTwoDigits = (value: string) => {
    if (!value) return "";
    const num = parseInt(value, 10);
    return isNaN(num) ? "" : String(num).padStart(2, "0");
  };

  const onSubmit = (data: BirthdayFormData) => {
    const formatted = {
      day: String(data.day).padStart(2, "0"),
      month: String(data.month).padStart(2, "0"),
      year: String(data.year).padStart(4, "0"),
    };
    console.log(`${formatted.year}-${formatted.month}-${formatted.day}`);
    router.push("/body-form");
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute bottom-0 top-44 mb-10 flex flex-col justify-center items-center w-full"
    >
      <div className="flex flex-row justify-evenly items-center gap-2 px-4 bg-[#F3F3F4] w-60 h-20 rounded-[1.75rem]">
        {/* Day */}
        <div className="w-16 h-16">
          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                ref={dayRef}
                type="number"
                placeholder="DD"
                inputSize="large"
                className="text-center worksans-bold text-[1.25rem] rounded-[1.25rem] p-0 focus:shadow-[0_0_0_4px_#F9731640] not-focus:bg-transparent not-focus:text-[#BABBBE]"
                style={{ direction: "ltr" }}
                disabled={isSubmitting}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "").slice(0, 2);
                  const month = parseInt(monthValue || "0", 10);
                  // prevent entering 31 for months ≥ 7
                  if (month >= 7 && month <= 12 && val === "31") val = "30";
                  field.onChange(val);
                }}
                onBlur={(e) => setValue("day", padTwoDigits(e.target.value))}
              />
            )}
          />
        </div>

        {/* Month */}
        <div className="w-16 h-16">
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                placeholder="MM"
                inputSize="large"
                className="text-center worksans-bold text-[1.25rem] rounded-[1.25rem] p-0 focus:shadow-[0_0_0_4px_#F9731640] not-focus:bg-transparent not-focus:text-[#BABBBE]"
                style={{ direction: "ltr" }}
                disabled={isSubmitting}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                  field.onChange(val);
                }}
                onBlur={(e) => setValue("month", padTwoDigits(e.target.value))}
              />
            )}
          />
        </div>

        {/* Year */}
        <div className="w-16 h-16">
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                placeholder="YYYY"
                inputSize="large"
                className="text-center worksans-bold text-[1.25rem] rounded-[1.25rem] p-0 focus:shadow-[0_0_0_4px_#F9731640] not-focus:bg-transparent not-focus:text-[#BABBBE]"
                style={{ direction: "ltr" }}
                disabled={isSubmitting}
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
              />
            )}
          />
        </div>
      </div>

      {/* Error display */}
      {Object.values(errors).some((e) => e?.message) && (
        <p className="text-red-500 peyda-light text-xs ml-auto mr-20 mt-2 text-center">
          ***{" "}
          {errors.day?.message || errors.month?.message || errors.year?.message}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="gap-3 h-14 mt-auto w-[90%] rounded-[1.25rem] peyda-semibold"
      >
        ادامه
      </Button>
    </Form>
  );
}
