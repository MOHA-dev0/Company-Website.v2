"use client";
import React, { useState, useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import Cards from "@/components/Cards";
import Navbar from "@/components/NavBar";

export default function AdminPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  // router protection
  useEffect(() => {
    const user = account.get();

    user.then(
      (res) => {
        setUserInfo(res);
      },
      (error) => {
        router.push("/login");
      }
    );
  }, [router]);

  const logout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar admin={true} />
      {/* Main Content */}
      <div className="pt-24 px-6 py-4">
        <Cards />
      </div>
    </div>
  );
}
