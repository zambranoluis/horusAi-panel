"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logoutUser } from "@/services/authService";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div>
        <button onClick={() => router.push("/home")}>Home</button>
        <button onClick={() => router.push("/reports")}>Reports</button>
        <button onClick={() => router.push("/events")}>Events</button>
        <button onClick={() => router.push("/users")}>Users</button>
        <button onClick={() => router.push("/management")}>Settings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
