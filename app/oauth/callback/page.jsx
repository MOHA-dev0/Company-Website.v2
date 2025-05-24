"use client";

import { useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";

export default function OAuthCallback() {
  const WAIT_LABEL = "Logging you in, please wait...";

  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndRedirect() {
      try {
        const user = await account.get();

        router.push(`/profile/${user.$id}`);
      } catch (error) {
        console.error("Failed to fetch user after OAuth login:", error);
        router.push("/login");
      }
    }

    fetchUserAndRedirect();
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <svg
        className="animate-spin h-8 w-8 text-blue-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <p>{WAIT_LABEL}</p>
    </div>
  );
}
