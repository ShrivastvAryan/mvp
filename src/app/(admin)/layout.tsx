"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoot = pathname === "/admin";

  return (
    <main className="bg-brand-primary min-h-screen flex">
      {/* Show sidebar only if NOT /admin */}
      {!isAdminRoot && <Sidebar />}

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-6">
          {children}
        </div>
      </div>
    </main>
  );
}