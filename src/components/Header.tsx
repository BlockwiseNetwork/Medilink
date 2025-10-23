"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link href={href} passHref>
    <Button variant="ghost" onClick={onClick}>{children}</Button>
  </Link>
);

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/chatbot", label: "AI Assistant" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-6">
                <Logo />
              </div>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Desktop Logo centered for mobile */}
            <div className="flex justify-center md:hidden">
                <Logo />
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
