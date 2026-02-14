import SideBar from "@/components/seller/Sidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="bg-brand-primary">
        <SideBar/>
        {children}
      </main>
    </div>
  );
}
