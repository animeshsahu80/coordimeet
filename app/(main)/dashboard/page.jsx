"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/validators";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/app/actions/users";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { loading, error, fn: fnUpdateUserName } = useFetch(updateUsername);

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      setOrigin(window.location.origin);
    }
    form.setValue("username", user?.username);
  }, [isLoaded]);

  async function onSubmit(values) {
    await fnUpdateUserName(updateUsername(values?.username));
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
        {/* {Latest updates} */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique link</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <span className="flex items-center gap-4">
                        {window?.location?.origin}/
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                      </span>
                    </div>
                    <FormMessage />
                    {error &&
                      error.message !==
                        "Cannot read properties of undefined (reading 'workers')" && (
                        <p className="text-red-500 text-sm mt-1">
                          {error?.message}
                        </p>
                      )}
                  </FormItem>
                )}
              />
              {loading && <BarLoader width="100%" color="green" />}
              <Button type="submit"> Update Username</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
