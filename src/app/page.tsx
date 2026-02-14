'use client'
import Caraousel from "@/components/home/caraousel";
import Categories from "@/components/home/Categories";
import Exhibition from "@/components/home/Exhibition";
import TrendingProducts from "@/components/home/Shop";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";


export default function Home() {
  const { isAuthenticated, role, email, hasHydrated } = useAuth();
  
  return (
   <div className="mt-18" >
     {/* <p className="text-2xl font-bold">Hi there</p>
     <div className="mt-4 space-y-2">
       <h1><strong>Role:</strong> {role ?? "null"}</h1>
       <h1><strong>Authenticated:</strong> {isAuthenticated ? "true" : "false"}</h1>
       <h1><strong>Email:</strong> {email ?? "null"}</h1>
       <h1><strong>Has Hydrated:</strong> {hasHydrated ? "true" : "false"}</h1>
     </div> */}
     <Caraousel/>
     <Exhibition/>
     <Categories/>
     <TrendingProducts/>
   </div>
  );
}
