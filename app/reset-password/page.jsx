"use client";
import { useState } from "react";
import { db } from "../utils/database";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_1xixbzc";
const EMAILJS_TEMPLATE_ID = "template_9vuidkk";
const EMAILJS_PUBLIC_KEY = "LjRRg9g-WXfvsDast";

const Rest_PASSWORD_TITLE = "Reset Password";
const EMAIL_PLACEHOLDER = "Enter your email to reset password";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendResetEmail = async (userEmail, link) => {
    const templateParams = {
      link: link,
      email: userEmail,
    };

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);
    } catch (err) {
      console.log("Error text:", JSON.stringify(templateParams));
      console.error("Failed to send reset email:", err);
      if (err.status) {
        console.error(`Error status: ${err.status}`);
      }
      throw new Error("Email sending failed");
    }
  };

  const generateSecret = () => Math.random().toString(36).substring(2, 16);

  const handleResetPassword = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!email) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await db.users.list([
        db.users.query.equal("email", email),
      ]);

      const user = response?.documents?.[0];

      if (!user) {
        setError("User not found. Please check your email.");
        setLoading(false);
        return;
      }

      const secret = generateSecret();
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-confirm?userId=${user.authId}&secret=${secret}`;
      await sendResetEmail(email, resetLink);

      setSuccessMessage("Reset link has been sent to your email.");
    } catch (e) {
      console.error("Reset password error:", e);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  console.log("Service ID:", EMAILJS_SERVICE_ID);
  console.log("Template ID:", EMAILJS_TEMPLATE_ID);
  console.log("Public Key:", EMAILJS_PUBLIC_KEY);
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
        type="email"
        placeholder={EMAIL_PLACEHOLDER}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
};

export default ResetPasswordPage;
