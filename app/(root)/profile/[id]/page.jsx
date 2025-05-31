"use client";

import { useState } from "react";
import Navbar from "@/components/NavBar";
import Cards from "@/components/Cards";
import SendMessage from "@/components/userpage/SendMessage";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const [showSendMessages, setShowSendMessages] = useState(false);
  const { userId } = useParams();

  const handleToggleSendMessages = () => {
    setShowSendMessages((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        admin={false}
        onToggle={handleToggleSendMessages}
        clicked={showSendMessages}
      />
      <div className="pt-24 px-6 py-4">
        {showSendMessages ? <SendMessage /> : <Cards />}
      </div>
    </div>
  );
}
