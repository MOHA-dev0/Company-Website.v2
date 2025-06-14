"use client";
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { account, teams } from "@/app/utils/appwrite";
=======
import { account } from "@/app/utils/appwrite";
>>>>>>> Admin-Recive-Message#5
import { useRouter } from "next/navigation";
import Cards from "@/components/Cards";
import Navbar from "@/components/NavBar";
import ReciveMessage from "@/components/adminpage/ReciveMessage";
<<<<<<< HEAD
import UsersList from "@/components/adminpage/UsersList";
=======
>>>>>>> Admin-Recive-Message#5

export default function AdminPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
<<<<<<< HEAD
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndCheckAdmin = async () => {
      try {
        const user = await account.get();
        setUserInfo(user);

        const userTeams = await teams.list();
        const isUserAdmin = userTeams.teams.some(
          (team) => team.name === "admins"
        );
        setIsAdmin(isUserAdmin);

        if (!isUserAdmin) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCheckAdmin();
=======
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const user = account.get();
    user.then(
      (res) => setUserInfo(res),
      () => router.push("/login")
    );
>>>>>>> Admin-Recive-Message#5
  }, [router]);

  const handleToggleMessages = () => {
    setShowMessages((prev) => !prev);
<<<<<<< HEAD
    setShowUsers(false);
  };

  const handleToggleUsers = () => {
    setShowUsers((prev) => !prev);
    setShowMessages(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        admin={isAdmin}
        onToggle={handleToggleMessages}
        onUsersToggle={handleToggleUsers}
        clicked={showMessages}
        clickedUsers={showUsers}
      />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 py-6">
        {showMessages ? (
          <ReciveMessage />
        ) : showUsers ? (
          <UsersList />
        ) : (
          <Cards />
        )}
      </main>
=======
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        admin={true}
        onToggle={handleToggleMessages}
        clicked={showMessages}
      />
      <div className="pt-24 px-6 py-4">
        {showMessages ? <ReciveMessage /> : <Cards />}
      </div>
>>>>>>> Admin-Recive-Message#5
    </div>
  );
}
