"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Mountain } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/store/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAppContext();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Profil", path: "/profil" },
    { name: "Divisi", path: "/divisi" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img src="/images/MHPK logo tok.png" alt="Logo MAHAPEKA" className="h-9 w-9 object-contain" />
            <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              MAHAPEKA<span className="text-orange-500">BANDUNG</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  pathname === link.path
                    ? "text-orange-500"
                    : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
              <ThemeToggle />
              {isLoggedIn ? (
                <Link
                  href="/admin"
                  className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Portal Admin
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path
                    ? "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {isLoggedIn ? (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-neutral-900 dark:text-white"
                >
                  Portal Admin
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-orange-600 dark:text-orange-500"
                >
                  Login Pengurus
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
