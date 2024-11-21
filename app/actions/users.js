"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from '@clerk/backend'

export async function updateUsername(username) {
  const { userId } = await auth();
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
  
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const existingUsername = await db.user.findUnique({
    where: { username },
  });
  if (existingUsername && existingUsername?.id === userId) {
    throw new Error("Username is already taken");
  }
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  try {

    console.log(clerkClient.users); // Debugging
    await clerkClient.users.updateUser(userId, {
      username,
    });
  } catch (error) {
    console.error("Error updating Clerk user:", error);
    throw new Error("Failed to update Clerk user");
  }


  return { success: true };
}
