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
    <main className="flex h-full w-full items-center justify-center bg-[--color-background]">
      {!isVerified ? (
        <form
          onSubmit={verifyAdmin}
          className="shadowwhite shadowmd bg[url(/cardBG.webp)] relative flex h-full w-full flex-col items-center justify-center rounded-xl border bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute h-full w-full bg-black/40"></div>
          <div className="z-[10] flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <h2 className="text-center text-xl font-bold drop-shadow-[0px_3px_3px_rgba(0,0,0,1)]">
                Verify Admin
              </h2>
            </div>
            <div className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focusring border[var(--color-secondary)] w-full rounded-lg border bg-black/50 px-4 py-2 backdrop-blur-[2px] focus:border-[var(--color-secondary)] focus:outline-none"
              />
            </div>
            <div className="bggreen-500 flex justify-center">
              <button
                type="submit"
                className="rounded-lg bg-[var(--color-primary)] px-4 py-2 font-semibold hover:bg-[var(--color-secondary)]"
                disabled={checkingAdmin}
              >
                {checkingAdmin ? "Checking..." : "Continue"}
              </button>
            </div>
            <div className="bggreen-400 h-[40px] p-2">
              {error ? (
                <p className="text-center text-sm text-red-500">{error}</p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow-md"
        >
          <h2 className="text-center text-xl font-bold">Login</h2>
          {error && (
            <p className="0 text-center text-xs text-red-500">{error}</p>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-lg border bg-gray-100 px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none focus:ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800"
          >
            Log in
          </button>
        </form>
      )}
    </main>
  );
}
