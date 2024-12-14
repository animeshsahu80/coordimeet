"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/app/actions/events";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
const EventCard = ({ event, username, isPublic = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 4000);
    } catch (error) {}
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };
  const handleDelete = async () => {
    try {
      await deleteEvent(event.id);
      toast({
        description: "Event deleted successfully",
        variant: "success",
        style: {
          backgroundColor: "#dcfce7", // Custom green color for success
        },
      });
    router.refresh();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the event. Please try again.",
        variant: "destructive", // Variant for error messages
      });

      throw new Error(error);
    }
  };
  return (
    <div>
      <Card onClick={handleCardClick} className="flex flex-col justify-between cursor-pointer">
        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>
              Duration: {event.duration} mins |{" "}
              {event.isPrivate ? "Private" : "Public"}
            </span>
            <span>{event._count.bookings} Bookings</span>
          </CardDescription>
        </CardHeader>
        <CardContent>{event.description}</CardContent>

        {!isPublic && (
          <CardFooter className="flex justify-between">
            <Button onClick={handleCopy} variant="outline">
              <Link></Link>
              {isCopied ? "Copied" : "Copy link"}
            </Button>
            <Button onClick={handleDelete}  variant="destructive">
              <Trash2></Trash2>
              Delete
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
