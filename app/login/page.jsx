"use client";

import { useState } from "react";
import { account } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { teams } from "@/app/utils/appwrite";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const LOGIN_TITLE = "Login";
  const EMAIL_TITLE = "Email";
  const REGISTER_TITLE = "Register";
  const EMAIL_PLACEHOLDER = "Email";
  const PASSWORD_PLACEHOLDER = "Password";
  const GOOGLE_LOGIN_BUTTON_TEXT = "Continue with Google";
  const GITHUB_LOGIN_BUTTON_TEXT = "Continue with GitHub";
  const REGISTER_TEXT = "Don't have an account? ";
  const FORGET_PASSWORD_TEXT = "Forgot your password?";

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      await account.deleteSession("current").catch(() => {});

      await account.createEmailPasswordSession(email, password);

      const user = await account.get();

      if (!user.emailVerification) {
        setError(
          "Your account is not verified. Please check your email to activate your account."
        );
        await account.deleteSession("current");
        return;
      }

      let userTeams = null;
      for (let i = 0; i < 3; i++) {
        userTeams = await teams.list();
        if (userTeams.teams.length > 0) break;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const isAdmin = userTeams?.teams?.some((team) => team.name === "admins");

      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push(`/profile/${user.$id}`);
      }
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

  const loginWithGoogle = async () => {
    await account.deleteSession("current").catch(() => {});
    const redirectURL =
      "https://company-website-v2-neon.vercel.app//oauth/callback";

    account.createOAuth2Session(
      "google",
      redirectURL,
      redirectURL + "?prompt=select_account"
    );
  };

  const loginWithGitHub = async () => {
    await account.deleteSession("current").catch(() => {});
    const redirectURL =
      "https://company-website-v2-neon.vercel.app//oauth/callback";

    try {
      await account.deleteSession("current");
      console.log("Deleted current session");
    } catch (err) {
      console.warn("No active session to delete");
    }

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
          {REGISTER_TITLE}
        </a>
      </span>
      <span>
        <a className="text-blue-800" href="/rest-password">
          {FORGET_PASSWORD_TEXT}
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
        className="flex items-center justify-center gap-3 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 shadow"
      >
        <FcGoogle className="text-xl" />
        {GOOGLE_LOGIN_BUTTON_TEXT}
      </button>

      <button
        onClick={loginWithGitHub}
        className="flex items-center justify-center gap-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 shadow"
      >
        <FaGithub className="text-xl" />
        {GITHUB_LOGIN_BUTTON_TEXT}
      </button>
    </div>
  );
};

export default LoginPage;
