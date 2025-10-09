"use client";

import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { saveOtp } from "../../actions";
import { useUserContext } from "@/context/userContext";

import TextInput from "@/components/TextInput";
import Form from "@/components/Form";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, CallIcon } from "@hugeicons/core-free-icons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useLocalUser } from "@/hooks/useLocalUser";

// --- validation schemas
const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\+989|09)\d{9}$/, "Invalid Iranian phone number"),
});

//
// AuthForm Component
export default function PhoneNumberForm() {
  const router = useRouter();
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const { updateUser } = useUserContext();
   const { localUser, loading } = useLocalUser();

  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<{ phoneNumber: string }>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
  });

  useEffect(() => {
    if (!loading && localUser?.phoneNumber) {
      setValue("phoneNumber", localUser.phoneNumber);
    }
  }, [loading, localUser]);

  const onSubmit = async ({ phoneNumber }: { phoneNumber: string }) => {
    try {
      const result = await saveOtp(phoneNumber);
      updateUser({ phoneNumber: phoneNumber });
      if (result) {
        router.push("/otp-code");
      }
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="absolute bottom-0 top-40 w-full mt-10 flex justify-center">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%]"
      >
        <div className="w-full h-[3.5rem]">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                ref={phoneRef}
                type="text"
                placeholder="+98 912 XXXXX 52"
                inputSize="large"
                error={errors.phoneNumber?.message}
                className="peyda-bold text-base rounded-[1.25rem] px-12"
                disabled={isSubmitting}
                style={{ direction: "ltr" }}
                iconPrefix={<HugeiconsIcon icon={CallIcon} color="white" />}
              />
            )}
          />
        </div>
        <Button
          type="submit"
          iconPrefix={
            !isSubmitting && <HugeiconsIcon icon={ArrowRight02Icon} />
          }
          color="black"
          className="mt-auto mb-10 gap-3 h-14 rounded-[1.25rem] peyda-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "درحال ارسال..." : "ارسال کد تائید"}
        </Button>
      </Form>
    </div>
  );
}
