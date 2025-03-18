"use client";
import { useState } from "react";
import { account, ID, teams } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";

// Global Constants
const LOGIN_TITLE = "Login";
const EMAIL_PLACEHOLDER = "Email";
const PASSWORD_PLACEHOLDER = "Password";
const REGISTER_TEXT = "don't have an account? ";
const REGISTER_LINK_TEXT = "Register";
const LOGIN_BUTTON_TEXT = "Login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const login = async () => {
    try {
      let user;
      try {
        user = await account.get();
      } catch {
        await account.createEmailPasswordSession(email, password);
        await new Promise((resolve) => setTimeout(resolve, 500));
        user = await account.get();
      }

      let userTeams = null;
      for (let i = 0; i < 3; i++) {
        userTeams = await teams.list();
        if (userTeams.teams.length > 0) break;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (userTeams.teams.some((team) => team.name === "admins")) {
        router.push(`/admin`);
      } else {
        router.push(`/profile/${user.$id}`);
      }
    } catch (loginError) {
      setError("Invalid email or password");
      console.error("Login failed:", loginError);
    }
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
          {REGISTER_LINK_TEXT}
        </a>
      </span>

      <button
        onClick={login}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        {LOGIN_BUTTON_TEXT}
      </button>
    </div>
  );
};

export default LoginPage;
