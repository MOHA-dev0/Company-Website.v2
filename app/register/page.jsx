"use client";
import { useState } from "react";
import { account, ID } from "@/app/utils/appwrite";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
<<<<<<< HEAD
import { db } from "../utils/database";

const REGISTER_TITLE = "Register";
const EMAIL_PLACEHOLDER = "Email";
const USERNAME_PLACEHOLDER = "Username";
const PASSWORD_PLACEHOLDER = "Password";
const LOGIN_TEXT = "Already have an account? ";
const LOGIN_LINK_TEXT = "Login";
const REGISTER_BUTTON_TEXT = "Register";

=======
=======
import { db } from "../utils/database";
>>>>>>> Users-In-DashBoard-2-#9

// Global Constants
const REGISTER_TITLE = "Register";
const EMAIL_PLACEHOLDER = "Email";
const USERNAME_PLACEHOLDER = "UserName";
const PASSWORD_PLACEHOLDER = "Password";
const LOGIN_TEXT = "Do you have an account? ";
const LOGIN_LINK_TEXT = "Login";
const REGISTER_BUTTON_TEXT = "Register";

// Helper function to validate email
>>>>>>> Admin-Recive-Message#5
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
<<<<<<< HEAD
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
=======
  const router = useRouter();

  async function register() {
    setError(null);
    setSuccessMessage(null);

    if (!isValidEmail(email)) {
      setError("Invalid email format. Please enter a valid email.");
>>>>>>> Admin-Recive-Message#5
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
<<<<<<< HEAD
      setLoading(false);
=======
>>>>>>> Admin-Recive-Message#5
      return;
    }

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const secret = generateSecret();

      const authUser = await account.create(ID.unique(), email, password, name);

      await account.createEmailPasswordSession(email, password);

      await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify`
      );

      await account.deleteSession("current");

      await db.users.create(
=======
      const authUser = await account.create(ID.unique(), email, password, name);

      const response = await db.users.create(
>>>>>>> Users-In-DashBoard-2-#9
        {
          username: name,
          email: email,
          authId: authUser.$id,
<<<<<<< HEAD
          secret: secret,
=======
>>>>>>> Users-In-DashBoard-2-#9
        },
        authUser.$id
      );

<<<<<<< HEAD
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
=======
      await account.create(ID.unique(), email, password, name);
=======
      await account.createEmailPasswordSession(email, password);

>>>>>>> Users-In-DashBoard-2-#9
      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => router.push(`/profile/${authUser.$id}`), 2000);
    } catch (e) {
      console.error("Registration error:", e);

      if (e.message.includes("already exists")) {
        setError("This email is already registered.");
      } else {
        setError("Registration failed. Please try again.");
      }

      if (authUser) {
        try {
          await account.delete(authUser.$id);
        } catch (cleanupError) {
          console.error("Cleanup error:", cleanupError);
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
>>>>>>> Admin-Recive-Message#5
        {REGISTER_TITLE}
      </h2>

      {error && (
<<<<<<< HEAD
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
      )}

      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          {successMessage}
=======
        <div className="text-red-600 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="text-green-600 text-center mb-4">
          <p>{successMessage}</p>
>>>>>>> Admin-Recive-Message#5
        </div>
      )}

      <input
        type="email"
        placeholder={EMAIL_PLACEHOLDER}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder={USERNAME_PLACEHOLDER}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
=======
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <input
        type="name"
        placeholder={USERNAME_PLACEHOLDER}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />

>>>>>>> Admin-Recive-Message#5
      <input
        type="password"
        placeholder={PASSWORD_PLACEHOLDER}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <span className="text-sm text-gray-600">
        {LOGIN_TEXT}
        <a href="/login" className="text-blue-600 hover:underline">
=======
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <span>
        {LOGIN_TEXT}
        <a className="text-blue-800" href="/login">
>>>>>>> Admin-Recive-Message#5
          {LOGIN_LINK_TEXT}
        </a>
      </span>

      <button
        onClick={register}
<<<<<<< HEAD
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition duration-300`}
      >
        {loading ? "Registering..." : REGISTER_BUTTON_TEXT}
=======
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        {REGISTER_BUTTON_TEXT}
>>>>>>> Admin-Recive-Message#5
      </button>
    </div>
  );
};

export default RegisterPage;
