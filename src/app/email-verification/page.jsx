"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  applyActionCode,
  signInWithCustomToken,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/contexts/AuthContext";

const EmailVerificationContent = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  const { refreshUserInfo } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      // Don't proceed if auth isn't initialized
      if (!authInitialized) return;

      try {
        const mode = searchParams.get("mode");
        const oobCode = searchParams.get("oobCode");

        if (mode !== "verifyAndChangeEmail" || !oobCode) {
          throw new Error("Invalid verification link");
        }

        // Get current user's ID token before email verification
        const currentUser = auth.currentUser;
        let customToken = null;

        if (currentUser) {
          try {
            // Get a custom token from your backend
            const idToken = await currentUser.getIdToken();
            const response = await fetch("/api/auth/custom-token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
              throw new Error("Failed to get custom token");
            }

            const data = await response.json();
            customToken = data.customToken;
          } catch (tokenError) {
            throw new Error("Failed to prepare session continuation");
          }
        }

        // Apply the email verification code
        await applyActionCode(auth, oobCode);

        // If we have a custom token, sign in the user again
        if (customToken) {
          try {
            await signInWithCustomToken(auth, customToken);
          } catch (signInError) {
            throw new Error("Failed to maintain session");
          }
        }

        setSuccess(true);
      } catch (err) {
        if (err.code === "auth/invalid-action-code") {
          setError(
            "This verification link has expired or has already been used. Please request a new verification email."
          );
        } else {
          setError(err.message || "Failed to verify email. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, authInitialized, refreshUserInfo]);

  if (loading) {
    return (
      <section className="pb-24 pt-48">
        <Container>
          <div className="container mx-auto mt-10 max-w-md">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Verifying your email...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    );
  }

  const continueUrl = searchParams.get("continueUrl");

  return (
    <section className="pb-24 pt-48">
      <Container>
        <div className="container mx-auto mt-10 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>
                {success
                  ? "Your email verification is complete"
                  : "There was a problem verifying your email"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle2 className="size-12 text-green-500" />
                  <p className="text-center text-green-600">
                    Your email is verified and updated successfully.
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    You can continue using your account with the new email
                    address.
                  </p>
                </div>
              ) : (
                <Alert variant="destructive">
                  <XCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            {success && continueUrl && (
              <CardFooter>
                <button
                  onClick={async () => {
                    try {
                      await refreshUserInfo();
                      window.location.href = continueUrl; // Using window.location for full page navigation
                    } catch (error) {
                      // Optionally handle the error, or proceed with navigation anyway
                      window.location.href = continueUrl;
                    }
                  }}
                  className={buttonVariants({
                    variant: "default",
                    className: "w-full",
                  })}
                >
                  Continue
                </button>
              </CardFooter>
            )}
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default function EmailVerificationPage() {
  return (
    <Suspense 
      fallback={
        <section className="pb-24 pt-48">
          <Container>
            <div className="container mx-auto mt-10 max-w-md">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="size-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Initializing...</p>
              </div>
            </div>
          </Container>
        </section>
      }
    >
      <EmailVerificationContent />
    </Suspense>
  );
}
