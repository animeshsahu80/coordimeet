
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";


export const checkUser= async()=>{
    const user= await currentUser();
    console.log(user);
    if(!user) return null;

    try {
        const loggedInUser= await db?.user.findUnique({
            where:{
                clerkUserId:user?.id
            }
        })
        console.log('user', user);
        if(loggedInUser) return loggedInUser;
        const name = `${user.firstName} ${user.lastName}`;

        const newUser = await db.user.create({
            data: {
              clerkUserId: user.id,
              name,
              imageUrl: user.imageUrl,
              email: user.emailAddresses[0].emailAddress,
              username: user.username,
            },
          });
      
          return newUser;

    } catch (error) {
        throw error;
    }   
}