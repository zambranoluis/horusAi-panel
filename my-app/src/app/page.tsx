"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { chechAdmin } from "@/services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./globals.css";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  const verifyAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingAdmin(true);
    try {
      const res = await chechAdmin(email);
      if (res.data.status === "success" && res.data.data === true) {
        setIsVerified(true);
        setError("");
      } else {
        setError("Only administrators are allowed to log in.");
      }
    } catch (err) {
      console.log(err);
      setError("There was an error verifying your access.");
    }
    setCheckingAdmin(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/home");
    } else {
      setError("Credentials do not match our records");
    }
  };

  return (
    <main className='max-h-screen max-w-screen flex flex-col items-center justify-center bg-[--color-background] px-4'>
      {!isVerified ? (
        <form
          onSubmit={verifyAdmin}
          className='w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-bold text-center'>Verify Admin Email</h2>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800'
            disabled={checkingAdmin}>
            {checkingAdmin ? "Checking..." : "Continue"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className='w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-bold text-center'>Login</h2>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              value={email}
              disabled
              className='w-full px-4 py-2 border rounded-lg bg-gray-100'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute inset-y-0 right-2 flex items-center text-gray-500'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800'>
            Log in
          </button>
        </form>
      )}
    </main>
  );
}
