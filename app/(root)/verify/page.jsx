"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { account } from "@/app/utils/appwrite";

function VerifyContent() {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret");
  const userId = searchParams.get("userId");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        if (!userId || !secret) {
          setStatus("error");
          return;
        }

        await account.updateVerification(userId, secret);
        setStatus("success");
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    verifyAccount();
  }, [userId, secret]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Verifying...
            </h1>
            <p className="text-gray-500">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold text-green-600 mb-4">
              Account Verified!
            </h1>
            <p className="text-gray-600 mb-4">
              Your account has been successfully activated.
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold text-red-600 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-4">
              Invalid or expired verification link.
            </p>
            <a
              href="/register"
              className="inline-block px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
