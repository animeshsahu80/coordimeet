import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/header";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const roboto = Roboto({
  weight: ["300", "100"], // Specify font weights you need
  subsets: ["latin"], // Specify subsets (e.g., latin, cyrillic, etc.)
});
export const metadata = {
  title: "Coordimeet",
  description: "Coordinating meetings made simple.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
       <html lang="en">
      <body className={roboto.className}>
        <Header></Header>

        <main className="min-h-screen bg-gradient-to-b from-green-200 to-white">
          {children}
        </main>
        <footer className="bg-green-50 py-12">
          <div className="container mx-auto text-center text-gray-500">
            <p>Made by animesh sahu</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>

   
  );
}
