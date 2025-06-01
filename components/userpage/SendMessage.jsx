"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/utils/database";
import { account } from "@/app/utils/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

const MESSAGE_TITLE = "Contact Us";
const MESSAGE_BUTTON_TEXT = "Send Message";
const USERNAME_LABEL = "Your Name";
const EMAIL_LABEL = "Email Address";
const MESSAGE_LABEL = "Your Message";
const PLACEHOLDER_MESSAGE =
  "We'd love to hear from you! Send us a message and we'll respond assoon as possible.";

export default function SendMessage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        if (userData.name) setUserName(userData.name);
        if (userData.email) setEmail(userData.email);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!username || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await db.messages.create({
        username,
        email,
        message,
        user_Id: user?.$id,
      });

      alert("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-6 lg:p-8"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500  p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <FiMessageSquare className="text-white" />
            {MESSAGE_TITLE}
          </h2>
          <p className="text-blue-100 mt-2">{PLACEHOLDER_MESSAGE}</p>
        </div>

        <form onSubmit={handleSendMessage} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label
                htmlFor="username"
                className="text-gray-600 font-medium flex items-center gap-2"
              >
                <FiUser className="text-blue-500" />
                {USERNAME_LABEL}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label
                htmlFor="email"
                className="text-gray-600 font-medium flex items-center gap-2"
              >
                <FiMail className="text-blue-500" />
                {EMAIL_LABEL}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label
              htmlFor="message"
              className="text-gray-600 font-medium flex items-center gap-2"
            >
              <FiMessageSquare className="text-blue-500" />
              {MESSAGE_LABEL}
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend />
                  {MESSAGE_BUTTON_TEXT}
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.section>
  );
}
