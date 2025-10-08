"use server";

import { client } from "@/lib/redis-db";

export async function resendOtp(phoneNumber: string) {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await client.set(phoneNumber, otp, { EX: 120 });

  return otp;
}

export async function verifyOtp(otpCode: string, phoneNumber: string) {
  const savedOtp = await client.get(phoneNumber);
  if (otpCode === savedOtp) {
    return otpCode;
  } else {
    throw new Error("کد تأیید اشتباه است.");
  }
}
