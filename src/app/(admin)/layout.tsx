import Sidebar from "@/components/admin/Sidebar";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="bg-brand-primary h-screen w-full flex">
        <div className="w-72">
        <Sidebar/>
        </div>
        <div className="w-full ml-20">{children}</div>
      </main>
    </div>
  );
}
