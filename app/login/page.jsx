"use client";

import { useState } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // تسجيل الدخول بالإيميل وكلمة المرور
  const login = async () => {
    setError("");
    setLoading(true);

    try {
      await account.deleteSession("current").catch(() => {}); // حذف الجلسة الحالية لو موجودة
      await account.createEmailPasswordSession(email, password);

      // بعد تسجيل الدخول، جلب بيانات المستخدم
      const user = await account.get();

      // التوجيه إلى صفحة الملف الشخصي مع معرف المستخدم
      router.push(`/profile/${user.$id}`);
    } catch (err) {
      if (err?.message?.includes("invalid credentials")) {
        setError("Incorrect email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الدخول باستخدام Google OAuth
  const loginWithGoogle = () => {
    // رابط إعادة التوجيه يجب أن يكون ثابت ويطابق المسجل في إعدادات Appwrite وGoogle Cloud Console
    const redirectURL = "http://localhost:3000/oauth/callback";

    account.createOAuth2Session("google", redirectURL, redirectURL);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>

      {error && (
        <div className="text-red-600 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />

      <span>
        Don't have an account?{" "}
        <a className="text-blue-800" href="/register">
          Register
        </a>
      </span>

      <button
        onClick={login}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default LoginPage;
