"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { eventSchema } from "@/lib/validators";
import { addDays, addMinutes, format, isBefore, parseISO, startOfDay } from "date-fns";

export async function createEvent(data) {
  const { userId } = await auth();
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });
  const validateData = eventSchema.parse(data);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!existingUser) {
    throw new Error("User Not found");
  }
  const event = await db.event.create({
    data: {
      ...validateData,
      userId: existingUser.id,
    },
  });

  return event;
}

export async function getUserEvents() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  const events = await db.event.findMany({
    where: { userId: existingUser?.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return { events, username: existingUser.username };
}

export async function deleteEvent(eventId) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingEvent = await db.event.findUnique({
    where: { id: eventId }
  });
  if (!existingEvent) throw new Error("Event not found");
  const deletedEvent = await db.event.delete({
    where: {
      id: eventId
    }
  });

  return deleteEvent;
}


export async function getEventDetails(username, eventId) {
  const event= await db.event.findFirst({
    where:{
      id: eventId,
      user: {username}
    },
    include:{
      user:{
        select:{
          name:true,
          email:true,
          imageUrl:true
        }
      }
    }
  })
  return event;
}


export async function getEventAvailability(eventId) {
  const event= await db.event.findUnique({
    where:{
      id: eventId,
    },
    include:{
      user:{
        include:{
          availability:{
            select:{
              days:true,
              timeGap: true
            }
          },
          bookings:{
            select:{
              startTime:true,
              endTime:true
            }
          }
        }
      }
    }
  })
  console.log('event', event);
  if(event===null || event.user.availabilty===null){

      return null;
  }
  const {availability , bookings}= event.user;
  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30); // Get availability for the next 30 days

  const availableDates = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dayOfWeek = format(date, "EEEE").toUpperCase();

    const dayAvailability = availability?.days?.find(
      (d) => d.day === dayOfWeek
    );
    if (dayAvailability) {
      const dateStr = format(date, "yyyy-MM-dd");
      const slots = generateAvailableTimeSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap
      );

      availableDates.push({
        date: dateStr,
        slots,
      });
    }
  }
  return availableDates;
}


function generateAvailableTimeSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap = 0
) {
  const slots=[];
  let currentTime = parseISO(
    `${dateStr}T${startTime.toISOString().slice(11, 16)}`
  );
  const slotEndTime = parseISO(
    `${dateStr}T${endTime.toISOString().slice(11, 16)}`
  );

  const now = new Date();
  if (format(now, "yyyy-MM-dd") === dateStr) {
    currentTime = isBefore(currentTime, now)
      ? addMinutes(now, timeGap)
      : currentTime;
  }
  while(currentTime< slotEndTime){
    const slotEnd=new Date(currentTime.getTime() + duration*60000);
    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }

    currentTime = slotEnd;

  }
  return slots;
}