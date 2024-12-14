"use client"
import { eventSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { createEvent } from "@/app/actions/events";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";

const EventForm = ({onSubmitForm}) => {

  const router= useRouter();
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
      description: "",
      title: "",
    },
  });
  const { loading, error, fn: fnCreateEvent } = useFetch(createEvent);

  async function onSubmit(values) {
    await fnCreateEvent(values);
    if(!loading && !error){
      onSubmitForm();
    }
    router.refresh();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Event</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter event title"
                      className="mt-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Event Description
            </label>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter event description"
                      className="mt-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (min)
            </label>
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        field.onChange(value || ""); // Handle number or empty string
                      }}
                      placeholder="Enter duration in minutes"
                      className="mt-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Event Privacy */}
          <div>
            <label htmlFor="isPrivate" className="block text-sm font-medium text-gray-700">
              Event Privacy
            </label>
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value ? "true" : "false"}
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Select Privacy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Private</SelectItem>
                        <SelectItem value="false">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>  
          {error &&
                      error.message !==
                        "Cannot read properties of undefined (reading 'workers')" && (
                        <p className="text-red-500 text-sm mt-1">
                          {error?.message}
                        </p>
                      )}
          {/* Submit Button */}
          <div className="pt-4">
            <Button disabled={loading} type="submit" variant="secondary" className="w-full">
              {loading?"Submiting...": "Create Event"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
