"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from '@clerk/backend'


export async function updateUsername(username) {
  // Define server-only logic inside a server context
  const serverUpdateUsername = async (username) => {
    "use server"; // Scoped usage

    const { userId } = await auth();
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

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
      await clerkClient.users.updateUser(userId, {
        username,
      });
    } catch (error) {
      throw new Error("Failed to update Clerk user");
    }

    return { success: true };
  };

  // Call the server-side logic
  return await serverUpdateUsername(username);
}


export async function getUserByUsername(username) {

  const user= await db.user.findUnique({
    where:{username},
    select:{
      id:true,
      name:true,
      email:true,
      imageUrl:true,
      events:{
        where:{
          isPrivate:false
        },
        orderBy:{
          createdAt:"desc"
        },
        select:{
          id:true,
          title:true,
          description:true,
          duration:true,
          isPrivate:true,
          _count:{
            select:{bookings:true}
          }
          
        }
      }
    }
  })

  return user;
  
}