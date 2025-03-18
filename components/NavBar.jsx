"use client";
import React, { useState, useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";

const ADMIN_DASHBOARD = "Admin Dashboard";
const WELCOME_MESSAGE = "Welcome, ";
const CREATE_NEW_POST_BUTTON = "✨ Create New Post";
const LOGOUT_BUTTON = "Logout";
const LOADING_MESSAGE = "Loading...";
const MAIN_PAGE_LABEL = "Main Page";

export default function Navbar({ admin }) {
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

  function handleCreatePost() {
    router.push("/CreateNewPost");
  }

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
            {admin ? (
              <p className="text-lg font-semibold">{ADMIN_DASHBOARD}</p>
            ) : (
              <p className="text-lg font-semibold">{MAIN_PAGE_LABEL}</p>
            )}
            <p className="text-lg font-semibold">
              {WELCOME_MESSAGE} {userInfo?.name || LOADING_MESSAGE}
            </p>
            <div className="flex items-center gap-4">
              {admin && (
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
                >
                  {CREATE_NEW_POST_BUTTON}
                </button>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                {LOGOUT_BUTTON}
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
            <p className="text-lg text-gray-600">{LOADING_MESSAGE}</p>
          </div>
        )}
      </div>
    </div>
  );
}
