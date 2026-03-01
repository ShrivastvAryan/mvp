import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-brand-primary min-h-screen flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-6">
          {children}
        </div>
      </div>

    </main>
  );
}