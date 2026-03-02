"use client";

import SideBar from "@/components/seller/Sidebar";
import FetchInterceptor from "@/components/interceptor/FetchInterceptor";
import AuthWrapper from "@/components/AuthWrapper";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper allowedRoles={["seller"]}>
      <FetchInterceptor />

      <div className="flex min-h-screen bg-[#D7CEBC]">
        <SideBar />

        <main className="flex-1 pt-16 lg:pt-0 lg:pl-72 transition-all duration-300">
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AuthWrapper>
  );
}