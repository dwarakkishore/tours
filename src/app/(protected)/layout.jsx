"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.toString();
  const callbackUrl = currentQuery
    ? `${pathname}?${currentQuery}` // Include query parameters
    : pathname;
  const { userInfo, loading } = useAuth();

  const userValid =
    !loading &&
    userInfo.phoneNumber &&
    userInfo.displayName &&
    userInfo.displayName?.trim() !== "" &&
    userInfo.email;

  useEffect(() => {
    if (!userValid) {
      router.replace(`/login?callback=${encodeURIComponent(callbackUrl)}`);
    }
  }, [userValid, router, callbackUrl]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If not loading and no user, don't render anything while redirecting
  if (!userValid) {
    return null;
  }

  // If we have a user, show the protected content
  return <>{children}</>;
}

export default function ProtectedLayout({ children }) {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}
