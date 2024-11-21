"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];

const TypewriterText = ({ text, speed = 70 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse ml-1 border-r-2 border-green-400 h-full">
        &nbsp;
      </span>
    </span>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col bg-gray-50 min-h-screen mx-auto px-4">
      <div className="flex w-full mx-6 my-6 mt-20 pt-20 overflow-x-hidden justify-between">
        {/* Text Section */}
        <div className="flex flex-col gap-4 max-w-4xl pt-20">
          <h1 className="text-6xl font-black text-green-400 font-sans gradient-title">
            <TypewriterText text="Coordinating meetings made simple." />
          </h1>
          <p className="text-lg text-gray-600">
            Coordinate meetings and create events tailored to your availability.
            Simplify scheduling to stay organized and productive.
          </p>
          <Link href="/dashboard">
            <Button  size="lg" className="text-lg">
              Get Started
              <ArrowRight></ArrowRight>
            </Button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex mx-20 justify-center max-w-md">
          <Image
            src="/landing.svg"
            width={500}
            height={500}
            alt="landing"
          ></Image>
        </div>
      </div>
      <div className="mb-24">
        <div className="flex items-center mb-10">
          <h2 className="mx-auto font-bold text-green-400 gradient-title text-2xl">
            Key features
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-12">
          {features.map((feature, index) => {
            return (
              <Card
                key={index}
                className="bg-gradient-to-b from-white to-gray-50 shadow-2xl hover:shadow-3xl rounded-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-200 hover:border-green-400"
              >
                <CardHeader>
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="bg-green-100 text-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-extrabold text-gray-800 tracking-wide">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="gap-4 text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="flex items-center mb-10 mt-20">
          <h2 className="mx-auto font-bold text-green-400 gradient-title text-2xl">
            How it works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="relative bg-green-400 text-white rounded-lg p-8 text-center mt-10 overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-10 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-lg transform -rotate-60 translate-x-[-100%] animate-shine"></div>

          {/* Content */}
          <h2 className="text-3xl font-bold mb-4">Start Coordinating!</h2>
          <p className="text-xl mb-6">
            Join thousands of professionals who trust coordimeet for efficient
            time management.
          </p>
          <Link href={"/dashboard"}>
            <Button size="lg" variant="outline" className="text-gray-600">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
