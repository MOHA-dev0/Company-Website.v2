"use client";
import { useState } from "react";
import { db } from "@/app/utils/database";
import { useSearchParams } from "next/navigation";

const Rest_PASSWORD_TITLE = "Reset Your Password";
const PASSWORD_PLACEHOLDER = "Enter your new password";
export default function RestPasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret");
  const userId = searchParams.get("userId");

  function handleResetPassword() {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!userId || !secret) {
      setError("Invalid request parameters.");
      setLoading(false);
      return;
    }

    db.users
      .list([db.users.query.equal("authId", userId)])
      .then((response) => {
        const user = response?.documents?.[0];
        if (!user || user.secret !== secret) {
          throw new Error("Invalid user or secret.");
        }
        return db.users.update(user.$id, { password });
      })
      .then(() => {
        setSuccessMessage("Password reset successfully. You can now log in.");
      })
      .catch((err) => {
        setError(
          err.message || "An error occurred while resetting the password."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        {Rest_PASSWORD_TITLE}
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
        placeholder={PASSWORD_PLACEHOLDER}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition duration-300`}
      >
        {loading ? "Sending..." : "Reset Password"}
      </button>
    </div>
  );
}
