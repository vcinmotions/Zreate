"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { LogOut, LayoutDashboard, Users, Mail } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import ThemeToggler from "@/components/Header/ThemeToggler";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (res.ok) {
        // Clear auth state from redux
        dispatch(setAuth({ token: "", user: null }));

        // Redirect to home page
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-black dark:text-white">
      {/* Sidebar */}
      <aside className="sidebar-animation fixed top-0 left-0 z-40 flex h-full w-20 flex-col border-r border-gray-200 bg-white p-4 transition-all duration-300 md:w-64 md:p-6 xl:pt-10 dark:border-neutral-800 dark:bg-gray-900">
        <h2 className="animate-fade-in-left dark:text-white-600 mb-10 text-center text-lg font-bold tracking-wider text-sky-900 md:text-left md:text-xl dark:text-sky-400">
          <span className="hidden md:block">ZREATE ADMIN </span>
          <span className="block md:hidden">Z</span>
        </h2>

        <div className="space-y-3 text-sm">
          <Link
            href="/admin"
            className="sidebar-link group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 hover:text-white"
          >
            <LayoutDashboard className="icon h-5 w-5" />
            <span className="hidden font-semibold md:inline">Dashboard</span>
          </Link>

          <Link
            href="/admin/users"
            className="sidebar-link group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 hover:text-white"
          >
            <Users className="icon h-5 w-5" />
            <span className="hidden font-semibold md:inline">Users</span>
          </Link>

          <Link
            href="/admin/contacts"
            className="sidebar-link group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 hover:text-white"
          >
            <Mail className="icon h-5 w-5" />
            <span className="hidden font-semibold md:inline">Messages</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-auto hidden text-center text-xs text-gray-400 md:block">
          © 2025 ZREATE
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="animate-fade-in-left sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-md transition-all duration-300 dark:bg-gray-900">
          <div className="flex items-center">
            <Image
              src="/images/logo/logo_light.png"
              onClick={() => router.push("/")}
              alt="ZREATE Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-wide text-sky-900 dark:text-white">
              ZREATE
            </span>
          </div>

          <ThemeToggler />

          <button
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </header>

        <main className="animate-fade-in-up flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
