import SideBar from "@/components/seller/Sidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="bg-brand-primary h-screen w-full flex">
        <div className="w-72">
        <SideBar/>
        </div>
        <div className="w-full ml-20">{children}</div>
      </main>
    </div>
  );
}
