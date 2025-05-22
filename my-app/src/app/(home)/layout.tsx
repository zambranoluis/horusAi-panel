"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useTokenExpirationCheck from "@/hook/useTokenExpirationCheck";
import Navbar from "@/components/Navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  useTokenExpirationCheck();

  const [loadingHome, setLoadingHome] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Evitar cambio hasta que se cargue la sesión

    if (!session?.accessToken) {
      router.push("/");
    } else {
      setLoadingHome(false); // Ya hay sesión válida, podemos mostrar contenido
    }
  }, [session, status, router]);

  return (
    <div>
      {loadingHome ? (
        <div className='text-center mt-10'>Loading...</div>
      ) : (
        <div>
          <Navbar />
          {children}
        </div>
      )}
    </div>
  );
}
