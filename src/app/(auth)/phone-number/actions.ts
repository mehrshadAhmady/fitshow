"use server";

import { client } from "@/lib/redis-db";

export async function saveOtp(phoneNumber: string) {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await client.set(phoneNumber, otp, { EX: 120 });

  return otp;
}
