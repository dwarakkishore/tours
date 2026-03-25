"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!window.recaptchaVerifier) {
        generateRecaptcha();
      }

      const formattedPhoneNumber = `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      setOtpSent(true);
      setLoading(false);
      toast({
        title: "Success",
        description: "OTP sent successfully!",
      });
    } catch (err) {
      setError(err.message || "Error sending OTP. Please try again.");
      setLoading(false);

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Error sending OTP. Please try again.",
      });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      toast({
        title: "Success",
        description: "Phone number verified successfully!",
      });
      setLoading(false);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Invalid OTP. Please try again.",
      });
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="mb-4 inline-block text-lg font-medium"
            >
              Log In to your Account
            </Label>
            <Input
              id="phone"
              type="tel"
              className="rounded-xl border-[#424242] p-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="1234567890"
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
                Sending OTP
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">
              OTP as been sent to your number {phoneNumber}
            </Label>
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
                Verifying
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>
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

export default PhoneAuth;
