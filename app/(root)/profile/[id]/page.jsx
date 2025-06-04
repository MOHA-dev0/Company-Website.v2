"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavBar";
import Cards from "@/components/Cards";
import { useParams } from "next/navigation";
import SendMessage from "@/components/userpage/SendMessage";
import FAQSection from "@/components/userpage/Faq";

export default function UserProfilePage() {
  const { userId } = useParams();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const messageVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2, // تأخير بسيط لظهور SendMessage بعد Cards
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar
        admin={false}
        onMessageClick={() => setShowSendMessage(!showSendMessage)}
      />

      <div className="pt-24 px-6 py-4 space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Cards />
        </motion.div>

        <AnimatePresence>
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <SendMessage />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <FAQSection />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
