"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Wallet,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import Logo from "../Logo";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/chatbot", icon: MessageSquare, label: "Chatbot" },
  { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
  { href: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
  { href: "/dashboard/profile", icon: UserIcon, label: "Profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-50 dark:bg-gray-900 border-r h-screen sticky top-0">
      <div className="p-4 border-b">
        <Logo />
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        {profile && user && (
           <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={user.photoURL ?? ""} alt={profile.fullName} />
              <AvatarFallback>{getInitials(profile.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
                <span className="font-semibold truncate text-sm">{profile.fullName}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
           </div>
        )}
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
