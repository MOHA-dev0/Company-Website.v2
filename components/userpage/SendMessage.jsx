import React, { useState } from "react";

const MESSAGE_TITLE = "Send Message";

export default function SendMessage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-6 rounded-lg shadow-lg m-8 bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {MESSAGE_TITLE}
      </h2>

      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="username" className="text-gray-600">
            Username<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="email" className="text-gray-600">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-gray-600">
          Message<span className="text-red-600">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
        Send Message
      </button>
    </div>
  );
}
