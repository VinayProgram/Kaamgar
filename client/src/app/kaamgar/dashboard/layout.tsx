import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/navigation-menu"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/kaamgar",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/kaamgar/profile",
    icon: Settings,
  },
]
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="w-full">
        <Navbar/>
        {children}
      </main>
    </SidebarProvider>
  )
}