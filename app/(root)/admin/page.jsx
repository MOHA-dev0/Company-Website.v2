"use client";
import React from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {userInfo ? (
        <>
          <p>admin dashboard</p>
          <button
            onClick={logout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
}
