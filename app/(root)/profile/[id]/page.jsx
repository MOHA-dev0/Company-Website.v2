"use client";
import Cards from "@/components/Cards";
import Navbar from "@/components/NavBar";

export default function UserPage() {
  return (
    <div className="">
      <Navbar admin={false} />
      <Cards />
    </div>
  );
}
