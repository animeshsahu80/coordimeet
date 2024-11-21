import { PenBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import UserMenu from "./User-Menu";
import { checkUser } from "@/lib/checkUser";
async function Header() {

    await checkUser();
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between bg-green-50 shadow-md border-b-1">
      <Link href="/" className="flex">
        <div className="bg-green-50 flex items-center justify-center">
          <Image
            src="/logo.png"
            width="180"
            height="60"
            alt="Schedulrr Logo"
            className="opacity-95"
          />
        </div>
      </Link>
      <div className="flex py-2 gap-4">
        <Link href="/events?create=true">
          <Button>
            <PenBox />
            Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="secondary">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
