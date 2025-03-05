"use client";
import React, { useState, useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";

export default function Navbar() {
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
    <div className="mb-20 bg-gray-100">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        {userInfo ? (
          <>
            <p className="text-lg font-semibold">Main Page</p>
            <p className="text-lg font-semibold">
              Welcome, {userInfo?.name || "Loading..."}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
