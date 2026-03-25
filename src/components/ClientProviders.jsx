"use client";

import { CheckoutProvider } from "@/contexts/CheckoutContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: true, // Refetch when window regains focus
      refetchOnMount: true, // Refetch when component mounts
      retry: 1, // Only retry once on failure
    },
  },
});
// Increment CACHE_VERSION when you need to force all users to refresh their cache
const CACHE_VERSION = "v3";

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  key: `BAYARD_CACHE_${CACHE_VERSION}`,
});

// Clean up old cache versions from localStorage
if (typeof window !== "undefined") {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("BAYARD_CACHE_") && key !== `BAYARD_CACHE_${CACHE_VERSION}`) {
      localStorage.removeItem(key);
    }
  });
}

export default function ClientProviders({ children }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        // 2 hours
        maxAge: 1000 * 60 * 60 * 2,
      }}
    >
      <AuthProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
