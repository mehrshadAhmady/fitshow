"use server";

import axios from "axios";
import { client } from "@/lib/redis-db";

const TEMPLATE_ID = "607123";
const API_KEY = "E1Jqu0syJ1xwL2z0X2vklJdiwXR5WgIPZTRypEem0ih0JJAv";

export async function saveOtp(phoneNumber: string) {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const savedOtp = await client.get(phoneNumber);
    if (!savedOtp) {
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

      await axios(config);
      return otp;
    } else {
      return savedOtp;
    }
  } catch (error: any) {
    throw new Error(
      `SMS sending error: ${error?.response?.data || error.message}`
    );
  }
}
