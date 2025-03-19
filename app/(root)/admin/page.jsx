"use client";
import React, { useState, useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import Cards from "@/components/Cards";
import Navbar from "@/components/NavBar";
import ReciveMessage from "@/components/adminpage/ReciveMessage";

export default function AdminPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [showMessages, setShowMessages] = useState(false); // New state

  useEffect(() => {
    const user = account.get();
    user.then(
      (res) => setUserInfo(res),
      () => router.push("/login")
    );
  }, [router]);

  const handleToggleMessages = () => {
    setShowMessages((prev) => !prev); // Toggle state
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        admin={true}
        onToggleMessages={handleToggleMessages}
        showMessages={showMessages}
      />
      <div className="pt-24 px-6 py-4">
        {showMessages ? <ReciveMessage /> : <Cards />}
      </div>
    </div>
  );
}
