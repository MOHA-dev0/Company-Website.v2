"use client";
import { useEffect, useState } from "react";
import { account } from "@/app/utils/appwrite";

export default function ResetConfirmPage() {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [secret, setSecret] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const uid = params.get("userId");
      const s = params.get("secret");
      console.log("userId:", uid);
      console.log("secret:", s);
      setUserId(uid);
      setSecret(s);
    }
  }, []);

  async function handleReset() {
    setError(null);
    try {
      if (!userId || !secret) throw new Error("Missing credentials");
      await account.updateRecovery(userId, secret, password, password);
      setSuccessMessage("Password reset successful. You may now log in.");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password.");
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Reset Your Password
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          {successMessage}
        </div>
      )}

      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300"
      />

      <button
        onClick={handleReset}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        Reset Password
      </button>
      <span>
        {" "}
        <a className="text-blue-800" href="/login">
          Go to Login
        </a>
      </span>
    </div>
  );
}
