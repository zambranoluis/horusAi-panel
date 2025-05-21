"use client";
// src/app/auth/error/page.js

import React from "react";
import { useRouter } from "next/navigation";

const AuthErrorPage = () => {
  const router = useRouter();
  const error = router;

  return (
    <main className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold text-red-600'>Authentication Error</h1>
      <p className='text-lg mt-4'>
        {error ? `Error: ${error}` : "An unexpected error occurred. Please try again."}
      </p>
      <button
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded '
        onClick={() => router.push("/")}>
        Back to Login
      </button>
    </main>
  );
};

export default AuthErrorPage;
