"use client";
import type React from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "../../components/sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="flex bg-background w-full ">
        <Sidebar />
        <main className="md:flex-1 ">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
