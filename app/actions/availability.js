"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";


export async function getUserAvailability() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
        availability:{
           include: {days:true}
        }
    }
  });

  if(!existingUser || !existingUser.availability){
    return null;
    
  }

  const availabilityData= {
    timeGap:existingUser.availability.timeGap
  };
  [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ].forEach(day=>{
    const dayAvailability=existingUser.availability.days.find((d)=>d.day===day);

    availabilityData[day]={
        isAvailable: !!dayAvailability,
        startTime: dayAvailability? dayAvailability.startTime.toISOString().slice(11,16):"9:00",
        endTime: dayAvailability? dayAvailability.endTime.toISOString().slice(11,16):"17:00"

    }
  })
  return availabilityData;

}




export async function updateUserAvailability(data) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
        availability:true
    }
  });
  if(!existingUser) throw new Error("User not found");


 const availabilityData=Object.entries(data).flatMap(
  ([day, {isAvailable,startTime,endTime}])=>{
    if(isAvailable){
      const baseDate= new Date().toISOString().split("T")[0];
    

    return [
      {
        day:day.toUpperCase(),
        startTime: new Date(  `${baseDate}T${startTime}:00Z`),
        endTime: new Date(  `${baseDate}T${endTime}:00Z`)
      }
    ]}
    return [];
  }
 )
 if (existingUser.availability) {
  await db.availability.update({
    where: { id: existingUser.availability.id },
    data: {
      timeGap: data.timeGap,
      days: {
        deleteMany: {},
        create: availabilityData,
      },
    },
  });
} else {
  await db.availability.create({
    data: {
      userId: existingUser.id,
      timeGap: data.timeGap,
      days: {
        create: availabilityData,
      },
    },
  });
}

return { success: true };

}
