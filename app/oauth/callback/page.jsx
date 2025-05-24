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
    <div className="flex justify-center items-center min-h-screen">
      <p>{WAIT_LABEL}</p>
    </div>
  );
}
