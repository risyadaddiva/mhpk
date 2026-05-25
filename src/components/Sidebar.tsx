"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Package, RefreshCw, LogOut, Mountain } from "lucide-react";
import { useAppContext } from "@/store/AppContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { setIsLoggedIn } = useAppContext();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Kelola Berita", icon: FileText, path: "/admin/berita" },
    { name: "Inventaris Alat", icon: Package, path: "/admin/inventaris" },
    { name: "Peminjaman", icon: RefreshCw, path: "/admin/peminjaman" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo MAHAPEKA" className="h-7 w-7 object-contain" />
          <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            MAHAPEKA<span className="text-orange-500">Admin</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-2">
          Menu Utama
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-500"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-orange-500" : "text-neutral-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
