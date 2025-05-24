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

  const LOGIN_TITLE = "Login";
  const EMAIL_TITLE = "Email";
  const EMAIL_PLACEHOLDER = "Email";
  const PASSWORD_PLACEHOLDER = "Password";
  const GOOGLE_LOGIN_BUTTON_TEXT = "Continue with Google";
  const GITHUB_LOGIN_BUTTON_TEXT = "Continue with GitHub";
  const REGISTER_TEXT = "Don't have an account? ";

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      await account.deleteSession("current").catch(() => {});
      await account.createEmailPasswordSession(email, password);

      const user = await account.get();

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

  const loginWithGoogle = () => {
    const redirectURL = "http://localhost:3000/oauth/callback";

    account.createOAuth2Session("google", redirectURL, redirectURL);
  };

  const loginWithGitHub = () => {
    const redirectURL = "http://localhost:3000/oauth/callback";
    console.log("Logging in with GitHub...");
    account.createOAuth2Session("github", redirectURL, redirectURL);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {LOGIN_TITLE}
      </h2>

      {error && (
        <div className="text-red-600 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <input
        type="email"
        placeholder={EMAIL_PLACEHOLDER}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />

      <input
        type="password"
        placeholder={PASSWORD_PLACEHOLDER}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />

      <span>
        {REGISTER_TEXT}{" "}
        <a className="text-blue-800" href="/register">
          {EMAIL_TITLE}
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
        {GOOGLE_LOGIN_BUTTON_TEXT}
      </button>
      <button
        onClick={loginWithGitHub}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        {GITHUB_LOGIN_BUTTON_TEXT}
      </button>
    </div>
  );
};

export default LoginPage;
