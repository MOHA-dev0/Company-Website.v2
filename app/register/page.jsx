"use client";
import { useState } from "react";
import { account, ID } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
import { db } from "../utils/database";

const REGISTER_TITLE = "Register";
const EMAIL_PLACEHOLDER = "Email";
const USERNAME_PLACEHOLDER = "Username";
const PASSWORD_PLACEHOLDER = "Password";
const LOGIN_TEXT = "Already have an account? ";
const LOGIN_LINK_TEXT = "Login";
const REGISTER_BUTTON_TEXT = "Register";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const generateSecret = () => Math.random().toString(36).substring(2, 16);

  const register = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!isValidEmail(email)) {
      setError("Invalid email format. Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const secret = generateSecret();

      const authUser = await account.create(ID.unique(), email, password, name);

      await account.createEmailPasswordSession(email, password);

      await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify`
      );

      await account.deleteSession("current");

      await db.users.create(
        {
          username: name,
          email: email,
          authId: authUser.$id,
          secret: secret,
        },
        authUser.$id
      );

      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (e) {
      console.error("Registration error:", e);

      if (e.message?.includes("already exists")) {
        setError("This email is already registered.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        {REGISTER_TITLE}
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
      <input
        type="text"
        placeholder={USERNAME_PLACEHOLDER}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder={PASSWORD_PLACEHOLDER}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <span className="text-sm text-gray-600">
        {LOGIN_TEXT}
        <a href="/login" className="text-blue-600 hover:underline">
          {LOGIN_LINK_TEXT}
        </a>
      </span>

      <button
        onClick={register}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition duration-300`}
      >
        {loading ? "Registering..." : REGISTER_BUTTON_TEXT}
      </button>
    </div>
  );
};

export default RegisterPage;
