"use client";
import { Loader2, PenLine, Phone, X, Check } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

function removeFirstThree(str) {
  return str.slice(3);
}

const PhonePanel = () => {
  const { user } = useAuth();
   
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldOtp, setOldOtp] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [step, setStep] = useState("view"); // "view" | "phone" | "old-otp" | "new-otp" | "completed"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oldVerificationId, setOldVerificationId] = useState(null);
  const [newVerificationId, setNewVerificationId] = useState(null);
  const { toast } = useToast();

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

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
      const now = Date.now();
      const isFresh = now - lastSignIn <= 5 * 60 * 1000;
      const formattedPhoneNumber = `+91${phoneNumber}`;

      if (isFresh) {
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }

        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          formattedPhoneNumber,
          window.recaptchaVerifier
        );

        setNewVerificationId(verificationId);
        setStep("new-otp");
        toast({
          title: "OTP Sent",
          description: "Check your new phone number for the verification code.",
        });
      } else {
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }

        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          user.phoneNumber,
          window.recaptchaVerifier
        );

        setOldVerificationId(verificationId);
        setStep("old-otp");
        toast({
          title: "OTP Sent",
          description:
            "Check your current phone number for the verification code.",
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

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOldOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(
        oldVerificationId,
        oldOtp
      );
      await reauthenticateWithCredential(user, credential);

      if (!window.recaptchaVerifier) {
        generateRecaptcha();
      }

      const formattedPhoneNumber = `+91${phoneNumber}`;
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedPhoneNumber,
        window.recaptchaVerifier
      );

      setNewVerificationId(verificationId);
      setStep("new-otp");
      toast({
        title: "OTP Sent",
        description: "Check your new phone number for the verification code.",
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

  const handleNewOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(
        newVerificationId,
        newOtp
      );
      await updatePhoneNumber(user, credential);

      setStep("completed");
      toast({
        title: "Success",
        description: "Your phone number has been updated successfully.",
      });
    } catch (error) {
      setError(
        error.message || "Failed to update phone number. Please try again."
      );
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to update phone number. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    setPhoneNumber("");
    setIsEditing(false);
    setStep("view");
  };

  const handleCancel = () => {
    setPhoneNumber("");
    setOldOtp("");
    setNewOtp("");
    setError("");
    setIsEditing(false);
    setStep("view");

    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  const startEdit = () => {
    setIsEditing(true);
    setStep("phone");
  };

  return (
    <div className="relative group overflow-hidden h-full">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -mr-16 -mb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative rounded-[2.5rem] border border-slate-100 bg-white/70 backdrop-blur-md p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 h-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-brand-blue/5 text-brand-blue border border-brand-blue/10 shadow-sm">
                <Phone className="size-5" />
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-[0.25em] text-brand-blue/40 text-[10px] mb-0.5">
                  Contact
                </h5>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</h4>
              </div>
            </div>
            {step === "view" ? (
              <Button
                variant="ghost"
                className="size-10 p-0 rounded-xl hover:bg-brand-blue/5 text-slate-400 hover:text-brand-blue transition-all"
                onClick={startEdit}
              >
                <PenLine className="size-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="size-10 p-0 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                onClick={handleCancel}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          <div className="flex-1">
            {step === "view" && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                  (+91) {user?.phoneNumber ? removeFirstThree(user.phoneNumber) : "Not Specified"}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                  <span className="size-1 rounded-full bg-emerald-500" />
                  Primary contact for bookings
                </p>
              </div>
            )}

            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">New Phone Number</label>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 h-14 flex items-center text-sm font-bold text-slate-400">+91</div>
                    <Input
                      type="tel"
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white focus:border-brand-blue/30 transition-all shadow-sm flex-1"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-brand-blue text-white font-bold h-12 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] shadow-lg shadow-brand-blue/10"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="size-4" />
                      <span>Request Code</span>
                    </>
                  )}
                </Button>
              </form>
            )}

            {(step === "old-otp" || step === "new-otp") && (
              <form onSubmit={step === "old-otp" ? handleOldOtpSubmit : handleNewOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Verification Code</label>
                  <Input
                    type="text"
                    className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white transition-all text-center text-2xl tracking-[0.5em] font-bold"
                    value={step === "old-otp" ? oldOtp : newOtp}
                    onChange={(e) => step === "old-otp" ? setOldOtp(e.target.value) : setNewOtp(e.target.value)}
                    placeholder="••••••"
                    maxLength={6}
                    required
                  />
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-2">
                    Code sent to {step === "old-otp" ? "current" : "new"} number
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-600 text-white font-bold h-12 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-600/10"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="size-4" />
                      <span>Verify OTP</span>
                    </>
                  )}
                </Button>
              </form>
            )}

            {step === "completed" && (
              <div className="text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                  <Check className="size-8" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Refresh Complete</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Record updated successfully</p>
                </div>
                <Button
                  className="w-full rounded-2xl border border-slate-200 bg-white text-slate-800 font-bold h-12 hover:bg-slate-50 transition-all x"
                  onClick={handleComplete}
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhonePanel;
