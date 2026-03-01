import SideBar from "@/components/seller/Sidebar";

// app/seller/layout.tsx

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#D7CEBC]">
      <SideBar />
      {/* Padding-top (pt-16) for mobile header
          Padding-left (lg:pl-72) for desktop sidebar 
      */}
      <main className="flex-1 pt-16 lg:pt-0 lg:pl-72 transition-all duration-300">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}