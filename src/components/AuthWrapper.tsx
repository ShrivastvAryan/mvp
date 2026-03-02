// components/AuthWrapper.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type Role = "buyer" | "seller";

interface AuthWrapperProps {
  allowedRoles?: Role[];
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthWrapper({
  allowedRoles,
  children,
  redirectTo = "/",
}: AuthWrapperProps) {
  const router = useRouter();
  const { role, isAuthenticated, hasHydrated } = useAuth();

  useEffect(() => {
    if (!hasHydrated) return;

    // Not logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Role restriction
    if (allowedRoles && (!role || !allowedRoles.includes(role))) {
      router.replace(redirectTo);
    }
  }, [role, isAuthenticated, hasHydrated]);

  if (!hasHydrated) return null;

  return <>{children}</>;
}