"use client"

import { Users, BookOpen, ClipboardList, BarChart2, Heart, Zap, User, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useSidebar } from "@/components/ui/sidebar"
// import { logout } from "@/app/action/auth"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
export function MobileSidebar() {
  const { openMobile, setOpenMobile } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { name: "Residents", Img: "/resident_5e1d62f6a2.png", href: "/dashbaord/pages/resident" },
    {
      name: "Medical",
      Img: "/heart.png",
      href: "/dashbaord/pages/medical",
    },
    {
      name: "Programs",
      Img: "/activities.png",
      href: "/dashbaord/pages/program",
    },
    {
      name: "Assessment",
      Img: "/assessment.png",
      href: "/dashbaord/pages/assessment",
    },
    {
      name: "salary",
      Img: "/money.png",
      href: "/dashbaord/pages/salary",
    },
    {
      name: "Staff",
      Img: "/staff.png",
      href: "/dashbaord/pages/profile",
    }

  ]

  const handleSignOut = async () => {
    setOpenMobile(false)
    // await logout()
  }

  const handleNavigation = (href: string) => {
    setOpenMobile(false)
    router.push(href)
  }

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        side="left"
        className="w-[250px] p-0 md:hidden [&>button]:border [&>button]:border-gray-600 [&>button]:rounded-[5px] bg-[#f5f0e0]"
      >
        {/* Add SheetTitle for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex flex-col h-full">
          <div className="border-b border-gray-300 py-4 px-4">
            <h2 className="text-xl font-bold text-green-700">KSH Dashboard</h2>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-left ${isActive(item.href)
                      ? "!bg-green-700 !text-white"
                      : "hover:bg-[#f5f1e4] text-gray-700 hover:text-green-800"
                    }`}
                >
                  <div className="w-20 h-13 mr-6 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Image
                      src={item.Img || "/placeholder.svg"}
                      alt={`${item.name} icon`}
                      width={80}
                      height={80}
                      className="object-fit"
                    />
                  </div>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-gray-200 py-4 px-2">
            <button
              onClick={() => handleNavigation("/dashboard/profile")}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
