"use client";
import Cards from "@/components/Cards";
import Navbar from "@/components/NavBar";
import SendMessage from "@/components/userpage/SendMessage";

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar admin={false} />
      <Cards />
      <hr className="border-1 border-gray-300 m-6 p-2" />
      <SendMessage />
    </div>
  );
}
