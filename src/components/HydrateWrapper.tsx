"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const HydrateWrapper = ({ children }: Props) => {
  const hasHydrated = useAuth((state) => state.hasHydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null until the component has mounted on the client 
  // and the Zustand store has finished rehydrating from localStorage
  if (!mounted || !hasHydrated) {
    return null; 
  }

  return <>{children}</>;
};

export default HydrateWrapper;
