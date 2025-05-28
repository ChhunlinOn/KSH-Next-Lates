import type React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientLayoutWrapper } from "../component/layout";
import { getSession } from "../action/auth";

export const metadata: Metadata = {
  title: "KSH Dashboard",
  description: "Resident management system for KSH",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session check
  const session = await getSession();
  if (!session) redirect("/login");

  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
