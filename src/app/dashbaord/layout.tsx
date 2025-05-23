import type React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientLayoutWrapper } from "../component/layout"; // path to the wrapper

export const metadata: Metadata = {
  title: "KSH Dashboard",
  description: "Resident management system for KSH",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Example server-side auth
  // const session = await getSession();
  // if (!session) redirect("/login");

  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
