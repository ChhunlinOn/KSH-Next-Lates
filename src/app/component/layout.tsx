"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "../Context/Programcontext";
import { ProgramProvider } from "../Context/ProgramTypecontext";
import { KshSidebar } from "./ksh-sidebar";
import { MobileHeader } from "./mobile-header";
import { MobileSidebar } from "./mobile-sidebar";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ProgramProvider>
            <UserProvider>
                <SidebarProvider defaultOpen={true}>
                    <MobileHeader />
                    <MobileSidebar />
                    <div className="flex h-screen w-full overflow-hidden">
                        <KshSidebar />
                        <div className="flex flex-col flex-1 w-full">
                            <main className="flex-1 overflow-auto w-full p-4 pt-16 md:p-6 md:pt-6">
                                {children}
                            </main>
                            <footer className="border-t bg-white py-3 md:py-4 text-center text-xs md:text-sm text-gray-500 w-full">
                                <div className="px-4 md:px-6" suppressHydrationWarning>
                                    © {new Date().getFullYear()} KSH. All rights reserved.
                                </div>
                            </footer>
                        </div>
                    </div>
                </SidebarProvider>
            </UserProvider>
        </ProgramProvider>
    );
}
// export default ClientLayoutWrapper;