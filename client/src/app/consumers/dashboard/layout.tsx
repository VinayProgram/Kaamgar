"use client"

import React from "react"
import {
  LayoutDashboard,
  Users,
  FilePlus,
  Briefcase,
  Bookmark,
  MessageSquare,
  Settings
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import NavbarUsers from "./components/JobCategoriesnavbar"

const menuItems = [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Browse Kaamgars",
            url: "/kaamgars",
            icon: Users,
          },
          {
            title: "Post a Job",
            url: "/jobs/new",
            icon: FilePlus,
          },
          {
            title: "My Jobs",
            url: "/jobs",
            icon: Briefcase,
          },
          {
            title: "Saved Kaamgars",
            url: "/kaamgars/saved",
            icon: Bookmark,
          },
          {
            title: "Messages",
            url: "/messages",
            icon: MessageSquare,
          },
          {
            title: "Settings",
            url: "/settings",
            icon: Settings,
          },
        ]
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar
        items={menuItems}
      />
      <main className="w-full">
        {/* You can add a Navbar component here if needed */}
        <NavbarUsers/>
        {children}
      </main>
    </SidebarProvider>
  )
}

