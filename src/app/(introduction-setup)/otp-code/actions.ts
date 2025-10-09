"use server";

import axios from "axios";
import { client } from "@/lib/redis-db";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const TEMPLATE_ID = "607123";
const API_KEY = "E1Jqu0syJ1xwL2z0X2vklJdiwXR5WgIPZTRypEem0ih0JJAv";

export async function resendOtp(phoneNumber: string) {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await client.set(phoneNumber, otp, { EX: 120 });
    const data = JSON.stringify({
      mobile: phoneNumber,
      templateId: TEMPLATE_ID,
      parameters: [{ name: "OTP", value: otp }],
    });

    const config = {
      method: "post",
      url: "https://api.sms.ir/v1/send/verify",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
        "x-api-key": API_KEY,
      },
      data,
    };

    const response = await axios(config);
    return otp;
  } catch (error: any) {
    throw new Error(
      `SMS sending error: ${error?.response?.data || error.message}`
    );
  }
}

export async function verifyOtp(otpCode: string, phoneNumber: string) {
  const savedOtp = await client.get(phoneNumber);
  if (!savedOtp) {
    throw new Error("کد منقضی شده است. لطفاً مجدداً تلاش کنید.");
  }
  if (otpCode !== savedOtp) {
    throw new Error("کد تأیید اشتباه است.");
  }
  const existingUser = await prisma.user.findUnique({
    where: { phoneNumber },
  });
  if (existingUser) {
    console.log("Existing user found:", existingUser.phoneNumber);
    redirect("/");
  }
  return { message: "User verified successfuly!" };
}
