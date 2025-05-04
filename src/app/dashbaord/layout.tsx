import type React from "react"
import { redirect } from "next/navigation"
import { getSession, logout } from "@/app/action/auth"
import Image from "next/image"
import Link from "next/link"
import { LogOut, Home, Settings, Users } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#207137] text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-white">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">KSH Dashboard</h1>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            {session.userRole === "admin" && (
              <Link
                href="/dashboard/users"
                className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition-colors"
              >
                <Users size={18} />
                <span>Users</span>
              </Link>
            )}

            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition-colors"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 transition-colors w-full text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </form>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow z-10">
          <div className="px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.userRole}</span>
              {session.userImage && (
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={session.userImage || "/placeholder.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    unoptimized // Add this to bypass image optimization for external URLs
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  )
}
