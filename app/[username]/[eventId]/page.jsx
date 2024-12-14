import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventCard from "@/components/event-card";
import { getEventAvailability, getEventDetails, getUserEvents } from "@/app/actions/events";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";

export async function generateMetadata({ params }) {
  
  const event = await getEventDetails(
    (await params).username,
    (await params).eventId
  );

  return {
    title: `Book ${event.title} with ${event.user.name} | coordimeet`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

const UserEventPage = async ({ params }) => {
  const availability= await getEventAvailability((await params).eventId);
  console.log("params", params);
  const event = await getEventDetails(
    (await params).username,
    (await params).eventId
  );
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }
  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8 gap-10">
      <EventDetails event={event}></EventDetails>
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  );
};

export default UserEventPage;
