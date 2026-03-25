"use client";

import {
  verifyBeforeUpdateEmail,
  PhoneAuthProvider,
  reauthenticateWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase/firebaseConfig";

const EmailUpdate = ({ callbackUrl }) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // "email" | "otp" | "completed"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const { toast } = useToast();

  // Cleanup reCAPTCHA on component unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const generateRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please try again.");
            toast({
              variant: "destructive",
              title: "Error",
              description: "reCAPTCHA expired. Please try again.",
            });
          },
        }
      );
    } catch (err) {
      setError("Error setting up verification. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error setting up verification. Please try again.",
      });
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
      const now = Date.now();
      const isFresh = now - lastSignIn <= 5 * 60 * 1000;

      if (isFresh) {
        // If recent authentication is fresh, send the verification link

        await verifyBeforeUpdateEmail(user, email, {
          url: `${window.location.origin}/${callbackUrl}`,
        });

        setStep("completed");
        toast({
          title: "Success",
          description: "Verification link sent to your email.",
        });
      } else {
        // Generate reCAPTCHA if not exists
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }

        // Send OTP for reauthentication using phone
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          user.phoneNumber,
          window.recaptchaVerifier
        );

        setVerificationId(verificationId);
        setStep("otp");
        toast({
          title: "OTP Sent",
          description: "Check your phone for the verification code.",
        });
      }
    } catch (error) {
      setError(error.message || "Failed to proceed. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to proceed. Please try again later.",
      });

      // Clear reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await reauthenticateWithCredential(user, credential);

      // Send email verification link after reauthentication

      await verifyBeforeUpdateEmail(user, email, {
        url: `https://www.bayardvacations.com/${callbackUrl}`,
      });

      setStep("completed");
      toast({
        title: "Success",
        description: "Verification link sent to your email.",
      });
    } catch (error) {
      setError(error.message || "Failed to verify OTP. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to verify OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 htmlFor="phone" className="mb-4 inline-block text-lg font-medium">
        Add your email
      </h4>
      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="rounded-xl border-[#424242] p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-brand-blue py-6 hover:bg-brand-blue-hovered"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Submit Email</>
            )}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              className="rounded-xl border-[#424242] p-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-brand-blue py-6 hover:bg-brand-blue-hovered"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>
      )}

      {step === "completed" && (
        <div className="py-4 text-center">
          <p className="font-medium text-green-600">
            Verification link has been sent to your email!
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please check your email and click the verification link to complete
            the process.
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default EmailUpdate;
