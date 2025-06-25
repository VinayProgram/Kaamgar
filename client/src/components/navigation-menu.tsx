"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-50">
      {/* Left Section: Sidebar Trigger + Logo */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-gray-800">Kaamgar</h1>
      </div>

      {/* Right Section: Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Jobs</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <NavigationMenuLink asChild>
                <Link href="/jobs" className="hover:underline">
                  Find Jobs
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/post-job" className="hover:underline">
                  Post a Job
                </Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <NavigationMenuLink asChild>
                <Link href="/profile" className="hover:underline">
                  View Profile
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/portfolio" className="hover:underline">
                  Portfolio
                </Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>More</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <NavigationMenuLink asChild>
                <Link href="/earnings" className="hover:underline">
                  Earnings
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/settings" className="hover:underline">
                  Settings
                </Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
