import type React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
// import { getSession } from "../action/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { KshSidebar } from "../component/ksh-sidebar"
import { MobileHeader } from "../component/mobile-header"
import { MobileSidebar } from "../component/mobile-sidebar"

export const metadata: Metadata = {
  title: "KSH Dashboard",
  description: "Resident management system for KSH",
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check authentication at the layout level
  // const session = await getSession()

  // // If no session, redirect to login
  // if (!session) {
  //   redirect("/login")
  // }

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Mobile Header - only visible on small screens */}
      <MobileHeader />

      {/* Mobile Sidebar - only visible when opened on mobile */}
      <MobileSidebar />

      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar - always visible on desktop, hidden on mobile */}
        <KshSidebar />

        {/* Main content area - takes remaining width */}
        <div className="flex flex-col flex-1 w-full">
          {/* Page content - add top padding on mobile for the header */}
          <main className="flex-1 overflow-auto w-full p-4 pt-16 md:p-6 md:pt-6">{children}</main>

          {/* Footer */}
          <footer className="border-t bg-white py-3 md:py-4 text-center text-xs md:text-sm text-gray-500 w-full">
            <div className="px-4 md:px-6" suppressHydrationWarning>
              © {new Date().getFullYear()} KSH. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  )
}
