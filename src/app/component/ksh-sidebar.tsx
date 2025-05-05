"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Users, BookOpen, ClipboardList, BarChart2, Heart, Zap, User, LogOut, Home, Calendar, MessageSquare, FileText, Settings, HelpCircle, Bell, Folder, UserPlus, Activity, Clock } from 'lucide-react'
import { logout } from "../action/auth"
import { useRouter, usePathname } from "next/navigation"

export function KshSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Main navigation items
  const mainNavItems = [
    { name: "Dashboard", icon: Home, path: "/dashbaord", active: isActive("/dashbaord") },
    { name: "Calendar", icon: Calendar, path: "/dashboard/calendar", active: isActive("/dashboard/calendar") },
    { name: "Messages", icon: MessageSquare, path: "/dashboard/messages", active: isActive("/dashboard/messages") },
  ]

  // Resident management items
  const residentItems = [
    { name: "Residents", icon: Users, path: "/dashboard/residents", active: isActive("/dashboard/residents") },
    {
      name: "Add Resident",
      icon: UserPlus,
      path: "/dashboard/residents/add",
      active: isActive("/dashboard/residents/add"),
    },
    { name: "Programs", icon: BookOpen, path: "/dashboard/programs", active: isActive("/dashboard/programs") },
    {
      name: "Assessment",
      icon: ClipboardList,
      path: "/dashboard/assessment",
      active: isActive("/dashboard/assessment"),
    },
  ]

  // Health management items
  const healthItems = [
    { name: "Medical", icon: Heart, path: "/dashboard/medical", active: isActive("/dashboard/medical") },
    { name: "Medications", icon: Activity, path: "/dashboard/medications", active: isActive("/dashboard/medications") },
    { name: "Appointments", icon: Clock, path: "/dashboard/appointments", active: isActive("/dashboard/appointments") },
  ]

  // Administrative items
  const adminItems = [
    { name: "Reporting", icon: BarChart2, path: "/dashboard/reporting", active: isActive("/dashboard/reporting") },
    { name: "Generate", icon: Zap, path: "/dashboard/generate", active: isActive("/dashboard/generate") },
    { name: "Documents", icon: FileText, path: "/dashboard/documents", active: isActive("/dashboard/documents") },
    { name: "Files", icon: Folder, path: "/dashboard/files", active: isActive("/dashboard/files") },
  ]

  const handleSignOut = async () => {
    await logout()
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    // Hide sidebar on mobile with the hidden md:block classes
    <div className="hidden md:block">
      <Sidebar className="border-r border-gray-200 w-80" collapsible="none">
        <SidebarHeader className="border-b border-gray-200 py-4">
          <div className="px-6">
            <h2 className="text-2xl font-bold text-green-700">KSH Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Resident Management System</p>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {/* Main Navigation */}
          <div className="px-4 py-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">Main Navigation</h3>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    isActive={item.active} 
                    onClick={() => navigateTo(item.path)}
                    className="py-2.5 px-3"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-base">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
{/* 
          <SidebarSeparator className="my-3" /> */}

          {/* Resident Management */}
          {/* <div className="px-4 py-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
              Resident Management
            </h3>
            <SidebarMenu>
              {residentItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    isActive={item.active} 
                    onClick={() => navigateTo(item.path)}
                    className="py-2.5 px-3"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-base">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>

          <SidebarSeparator className="my-3" /> */}

          {/* Health Management */}
          {/* <div className="px-4 py-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
              Health Management
            </h3>
            <SidebarMenu>
              {healthItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    isActive={item.active} 
                    onClick={() => navigateTo(item.path)}
                    className="py-2.5 px-3"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-base">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>

          <SidebarSeparator className="my-3" /> */}

          {/* Administrative */}
          {/* <div className="px-4 py-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">Administrative</h3>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    isActive={item.active} 
                    onClick={() => navigateTo(item.path)}
                    className="py-2.5 px-3"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-base">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>

          <SidebarSeparator className="my-3" /> */}

          {/* Notifications */}
          {/* <div className="px-4 py-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigateTo("/dashboard/notifications")}
                  isActive={isActive("/dashboard/notifications")}
                  className="py-2.5 px-3"
                >
                  <Bell className="h-5 w-5 mr-3" />
                  <span className="text-base">Notifications</span>
                  <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">3</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div> */}
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200 py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigateTo("/dashboard/profile")}
                isActive={isActive("/dashboard/profile")}
                className="py-2.5 px-3"
              >
                <User className="h-5 w-5 mr-3" />
                <span className="text-base">Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigateTo("/dashboard/settings")}
                isActive={isActive("/dashboard/settings")}
                className="py-2.5 px-3"
              >
                <Settings className="h-5 w-5 mr-3" />
                <span className="text-base">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => navigateTo("/dashboard/help")} 
                isActive={isActive("/dashboard/help")}
                className="py-2.5 px-3"
              >
                <HelpCircle className="h-5 w-5 mr-3" />
                <span className="text-base">Help & Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarSeparator className="my-3" />

            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleSignOut} 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 py-2.5 px-3"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="text-base">Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

