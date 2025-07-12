"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { User, PlusCircle, Briefcase, Bell } from "lucide-react"
import { DialogContext } from "@/app/context/dailog-context"
import React from "react"
import CreateAlert from "./create-alert"

export default function NavbarUsers() {
  const DailogContext = React.useContext(DialogContext)
  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-6 z-50 border-b">
      {/* Left: Sidebar & Logo */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-gray-800">Kaamgar</h1>
      </div>

      {/* Center: Big Search Bar */}
      <div className="flex-1 px-6">
        <Input
          type="text"
          placeholder="Search Kaamgars, jobs, skills..."
          className="w-full rounded-md border-gray-300 focus:ring-0"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Post Job CTA */}
        <Link href="/jobs/new" className="flex items-center space-x-1 text-sm font-medium text-primary hover:underline">
          <PlusCircle className="w-5 h-5" />
          <span>Create Job</span>
        </Link>

        <Link href={"#"} onClick={()=>console.log('he;;p')} className="flex items-center space-x-1 text-sm font-medium text-primary hover:underline">
          <PlusCircle className="w-5 h-5" />
          <span onClick={()=>DailogContext.setComponent(<CreateAlert/> )}>Create Alert</span>
        </Link>
        {/* Manage Jobs */}
        <Link href="/jobs" className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:underline">
          <Briefcase className="w-5 h-5" />
          <span>Manage Jobs</span>
        </Link>

        {/* Notifications */}
        <Link href="/notifications">
          <Bell className="w-5 h-5 text-gray-700 hover:text-primary" />
        </Link>

        {/* User Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center space-x-1">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 space-y-2">
                <NavigationMenuLink asChild>
                  <Link href="/profile" className="block hover:underline">
                    View Profile
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/settings" className="block hover:underline">
                    Settings
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/logout" className="block hover:underline text-red-500">
                    Logout
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
