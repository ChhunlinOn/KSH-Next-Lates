"use client"

import { Menu, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
// import { logout } from "../action/auth"
import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"

export function MobileHeader() {
  const { setOpenMobile } = useSidebar()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b bg-[#f5f0e0] shadow-sm md:hidden">
      <div className="flex h-full items-center justify-between px-4">
<button
  onClick={() => setOpenMobile(true)}
  className="flex h-8 w-8 items-center justify-center bg-green shadow hover:bg-green-100 transition-colors duration-150 border border-gray-200"
  aria-label="Open menu"
>
  <Menu className="h-6 w-6 text-black-700" />
</button>

        <h1 className="text-lg font-bold text-green-700">KSH</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
  <button className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
  <Image
    src="/resident_5e1d62f6a2.png"
    alt="Profile"
    width={32}
    height={32}
    className="rounded-full object-cover"
  />
</button>

          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Image
    src="/resident_5e1d62f6a2.png" // Replace with your user image path or variable
    alt="Profile"
    width={24}
    height={24}
    className="mr-2 h-6 w-6 rounded-full object-cover"
  />
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
