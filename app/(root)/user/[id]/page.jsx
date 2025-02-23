"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "@/app/utils/appwrite";

export default function UserPage() {
  const router = useRouter();
  const [userinfo, setUserInfo] = useState(null);

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
    <div>
      {userinfo ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {userinfo?.name || "Loading..."}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your ID: {userinfo?.$id || "Loading..."}
          </p>

          <button
            onClick={logout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
}
