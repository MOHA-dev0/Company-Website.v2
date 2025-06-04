"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const FAQ_TITLE = "Frequently Asked Questions";
const FAQ_DESCRIPTION =
  "Find quick answers to the most important questions about our company and services.";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Newshub?",
      answer:
        "Newshub is a blog platform where the latest tech news is published.",
    },
    {
      question: "What are the features of Newshub?",
      answer:
        "Newshub is a responsive website packed with many useful functions to serve you better.",
    },
    {
      question: "Who developed Newshub?",
      answer: "Newshub was developed by Mohamed Ramez (MOHADEV).",
    },
    {
      question: "Under whose supervision was Newshub developed?",
      answer: "Supervised by Professor Omar.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-7xl mx-auto p-6 lg:p-8 mt-12"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <FiHelpCircle className="text-white" />
            {FAQ_TITLE}
          </h2>
          <p className="text-blue-100 mt-2">{FAQ_DESCRIPTION}</p>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-100 last:border-0 pb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left font-medium text-gray-800 hover:text-blue-600 focus:outline-none transition-colors"
              >
                <span className="text-lg md:text-xl">{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-blue-500"
                >
                  <FiChevronDown size={24} />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-2 text-gray-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: faqs.length * 0.1 + 0.2 }}
            className="pt-6 text-center"
          >
            <p className="text-gray-600">
              Have more questions?{" "}
              <span className="text-blue-600">Contact us</span> and we'll be
              happy to help.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
