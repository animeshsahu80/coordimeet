"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { BarLoader } from "react-spinners";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For active link detection

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

const Applayout = ({ children }) => {
  const { isLoaded } = useUser();
  const pathname = usePathname();

  return (
    <>
      {!isLoaded && <BarLoader width="100%" color="green" />}

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block bg-green-100 text-gray-700">
          <nav className="py-6">
            <ul className="space-y-1 px-4">
              {navItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 mt-6 px-4 py-3 rounded-lg text-sm font-medium transition ${
                      pathname === href
                        ? "bg-green-200 text-green-900"
                        : "hover:bg-green-50 hover:text-green-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto ">
            <header className="mb-8">
                <h2 className="text-5xl font-sans font-bold gradient-title">
                    {navItems.find((item)=>item.href===pathname).label}
                </h2>
            </header>
        {children}

        </main>
        <nav className="py-6 md:hidden fixed bottom-0 left-0 right-0 ">
            <ul className="space-y-1 px-4 flex justify-around">
              {navItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex  gap-3 px-4 py-3 flex-col items-center rounded-lg text-sm font-medium ${
                      pathname === href
                        ? "bg-green-200 text-green-900"
                        : "hover:bg-green-50 hover:text-green-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        {/* Main content */}
      </div>
    </>
  );
};

export default Applayout;
