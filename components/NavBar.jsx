"use client";
import React, { useState, useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiUsers,
  FiMessageSquare,
  FiMail,
  FiLogOut,
} from "react-icons/fi";

const ADMIN_DASHBOARD = "Admin Dashboard";
const WELCOME_MESSAGE = "Welcome, ";
const CREATE_NEW_POST_BUTTON = "✨ Create New Post";
const LOGOUT_BUTTON = "Logout";
const MAIN_PAGE_LABEL = "Main Page";
const MESSAGES_LABEL = "See Messages";
const POSTS_LABEL = "Posts";
const SEND_MESSAGE_LABEL = "Send Message";
const USERS_LABEL = "Users";
const HIDE_USERS_LABEL = "Hide Users";

export default function Navbar({
  admin = false,
  onToggle,
  onUsersToggle,
  clicked = false,
  clickedUsers = false,
}) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserInfo(user);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleCreatePost = () => router.push("/CreateNewPost");

  const logout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4">
        <p className="text-center text-gray-600">Loading user...</p>
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div>
            <p className="text-lg font-semibold">
              {admin ? ADMIN_DASHBOARD : MAIN_PAGE_LABEL}
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {userInfo && (
              <p className="text-gray-600">
                {WELCOME_MESSAGE} {userInfo.name}
                {admin && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </p>
            )}

            {admin && (
              <>
                <button
                  onClick={handleCreatePost}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                >
                  <FiPlus className="mr-2" />
                  {CREATE_NEW_POST_BUTTON}
                </button>

                <button
                  onClick={onUsersToggle}
                  className={`flex items-center px-4 py-2 rounded-lg transition duration-300 shadow-md ${
                    clickedUsers
                      ? "bg-blue-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  <FiUsers className="mr-2" />
                  {clickedUsers ? HIDE_USERS_LABEL : USERS_LABEL}
                </button>
              </>
            )}

            <button
              onClick={onToggle}
              className={`flex items-center px-4 py-2 rounded-lg transition duration-300 shadow-md ${
                admin
                  ? clicked
                    ? "bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {admin ? (
                <>
                  <FiMessageSquare className="mr-2" />
                  {clicked ? POSTS_LABEL : MESSAGES_LABEL}
                </>
              ) : (
                <>
                  <FiMail className="mr-2" />
                  {clicked ? POSTS_LABEL : SEND_MESSAGE_LABEL}
                </>
              )}
            </button>

            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              <FiLogOut className="mr-2" />
              {LOGOUT_BUTTON}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
