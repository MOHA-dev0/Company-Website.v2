"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "@/app/utils/appwrite";

export default function UserPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

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
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name || "Loading..."}
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Your ID: {user?.$id || "Loading..."}
      </p>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}
