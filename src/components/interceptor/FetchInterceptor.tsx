"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function FetchInterceptor() {
    const { logout } = useAuth();
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (response.status === 401) {
        try {
          await originalFetch("/api/logout", {
            method: "POST",
            credentials: "include",
            
          });
          logout();
        } catch {}

        window.location.replace("login?user=seller");
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}