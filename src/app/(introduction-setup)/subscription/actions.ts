"use server";

import { User } from "@/context/userContext";
import { prisma } from "@/lib/prisma";

export async function createUser(user: User) {
  try {
    // create a new user or update existing (if phoneNumber matches)
    const newUser = await prisma.user.create({
      data: user,
    });

    console.log("User saved:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Error saving user!");
  }
}
