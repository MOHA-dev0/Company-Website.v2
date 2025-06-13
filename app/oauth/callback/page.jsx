"use client";

import { useEffect } from "react";
import { account, Permission } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import { db } from "@/app/utils/database";
import { teams } from "@/app/utils/appwrite";

export default function OAuthCallback() {
  const router = useRouter();

  async function saveGithubUsername(userId, githubUsername) {
    try {
      const res = await db.github.list([
        db.github.query.equal("userId", userId),
      ]);

      if (res.total > 0) {
        await db.github.update(res.documents[0].$id, { githubUsername });
      } else {
        await db.github.create(
          {
            userId,
            githubUsername,
          },
          [
            Permission.read(Role.user(userId)),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
          ]
        );
      }
    } catch (error) {
      console.error("Failed to save GitHub username:", error);
    }
  }

  useEffect(() => {
    async function fetchUserAndRedirect() {
      try {
        const user = await account.get();
        const session = await account.getSession("current");

        if (session.provider === "github" && session.providerAccessToken) {
          const githubRes = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${session.providerAccessToken}`,
            },
          });
          const githubUser = await githubRes.json();

          console.log("GitHub Username:", githubUser.login);

          await saveGithubUsername(user.$id, githubUser.login);
        }

        let userTeams = null;
        for (let i = 0; i < 3; i++) {
          userTeams = await teams.list();
          if (userTeams.teams.length > 0) break;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        const isAdmin = userTeams?.teams?.some(
          (team) => team.name === "admins"
        );

        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push(`/profile/${user.$id}`);
        }
      } catch (error) {
        console.error("Failed during OAuth callback:", error);
        router.push("/login");
      }
    }

    fetchUserAndRedirect();
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <svg
        className="animate-spin h-8 w-8 text-blue-500 mb-4"
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
      <p>Logging you in, please wait...</p>
    </div>
  );
}
