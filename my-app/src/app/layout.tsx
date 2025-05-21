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
    <html lang="en">
      <head>
        <title>CrimsontideAI Panel v1.0.0</title>

        <link rel="icon" href="/favicon-32x32-bg-negro.png" />
        <meta name="description" content="Powered by CrimsontideAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`antialiased overflow-y-auto overflow-x-hidden `}>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
