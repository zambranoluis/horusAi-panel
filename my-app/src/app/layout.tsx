"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
// import {DataContext} from "@/context/DataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <title>CrimsontideAI Panel v1.0.0</title>
        <link rel="icon" href="/favicon-32x32-bg-negro.png" />
        <meta name="description" content="Powered by CrimsontideAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <SessionProvider>
        <ThemeProvider>
          <body
            className={`h-screen w-screen overflow-y-auto overflow-x-hidden bg-[var(--bg-color)] text-[var(--text-color)] antialiased`}
          >
            {children}
          </body>
        </ThemeProvider>
      </SessionProvider>
    </html>
  );
}
