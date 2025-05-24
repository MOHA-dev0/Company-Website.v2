"use client";

import { useEffect } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndRedirect() {
      try {
        // جلب بيانات المستخدم المسجل بعد رجوعه من Google OAuth
        const user = await account.get();

        // التوجيه إلى صفحة الملف الشخصي الديناميكية
        router.push(`/profile/${user.$id}`);
      } catch (error) {
        console.error("Failed to fetch user after OAuth login:", error);
        // في حال فشل جلب المستخدم نوجه لصفحة تسجيل الدخول
        router.push("/login");
      }
    }

    fetchUserAndRedirect();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Logging you in, please wait...</p>
    </div>
  );
}
