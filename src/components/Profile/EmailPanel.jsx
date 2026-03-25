import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Mail, PenLine, X, Check } from "lucide-react";
import {
  verifyBeforeUpdateEmail,
  PhoneAuthProvider,
  reauthenticateWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase/firebaseConfig";

const EmailPanel = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("view"); // "view" | "email" | "otp" | "completed"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
      const now = Date.now();
      const isFresh = now - lastSignIn <= 5 * 60 * 1000;

      if (isFresh) {
        await verifyBeforeUpdateEmail(user, email, {
          url: "http://127.0.0.1:3000/checkout",
        });

        setStep("completed");
        toast({
          title: "Success",
          description: "Verification link sent to your email.",
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

      await verifyBeforeUpdateEmail(user, email, {
        url: "http://127.0.0.1:3000/checkout",
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

  const handleComplete = () => {
    setEmail("");
    setIsEditing(false);
    setStep("view");
  };

  const handleCancel = () => {
    setEmail("");
    setOtp("");
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
    setStep("email");
  };

  // New functions for the updated design
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setUpdating(true);

    try {
      await verifyBeforeUpdateEmail(user, email, {
        url: window.location.origin + "/profile", // Or a specific verification page
      });
      toast({
        title: "Verification Link Sent",
        description: `A verification link has been sent to ${email}. Please check your inbox.`,
      });
      setIsEditing(false);
      setVerificationSent(true); // Indicate that a link was sent
    } catch (err) {
      setError(err.message || "Failed to send verification link.");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to send verification link.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const sendVerificationLink = async () => {
    setSendingLink(true);
    setError("");
    try {
      await user.sendEmailVerification({
        url: window.location.origin + "/profile", // Or a specific verification page
      });
      toast({
        title: "Verification Link Sent",
        description: "A new verification link has been sent to your email.",
      });
      setVerificationSent(true);
    } catch (err) {
      setError(err.message || "Failed to send verification email.");
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to send verification email.",
      });
    } finally {
      setSendingLink(false);
    }
  };

  return (
    <div className="relative group overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative rounded-[2.5rem] border border-slate-100 bg-white/70 backdrop-blur-md p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-brand-blue/5 text-brand-blue border border-brand-blue/10 shadow-sm">
                <Mail className="size-5" />
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-[0.25em] text-brand-blue/40 text-[10px] mb-0.5">
                  Communication
                </h5>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</h4>
              </div>
            </div>

            {!isEditing ? (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    {user?.email || "Not Specified"}
                  </h3>
                  {user?.emailVerified ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                      <Check className="size-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 shadow-sm">
                      <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Pending</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium mt-3">
                  Account security and travel alerts will be sent here.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailUpdate} className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">New Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white focus:border-brand-blue/30 transition-all shadow-sm"
                    placeholder="traveler@luxury.com"
                    disabled={updating}
                    required
                  />
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    className="rounded-2xl bg-brand-blue px-8 h-12 text-white font-bold uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-300 flex items-center gap-3"
                    type="submit"
                    disabled={updating}
                  >
                    {updating ? (
                      <Loader2 className="size-4 animate-spin text-white" />
                    ) : (
                      <>
                        <Check className="size-4" />
                        <span>Update Email</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="rounded-2xl border border-slate-200 bg-white px-8 h-12 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    type="button"
                    disabled={updating}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {step === "completed" && (
              <div className="flex items-center gap-4 animate-in zoom-in-95 duration-300">
                <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Verification Link Sent!</p>
                  <p className="text-xs text-slate-500 font-medium">Please check your inbox at {email}</p>
                </div>
                <Button
                  variant="outline"
                  className="ml-auto rounded-2xl border-slate-200"
                  onClick={handleComplete}
                >
                  Close
                </Button>
              </div>
            )}
          </div>

          {step === "view" && (
            <div className="flex shrink-0">
              <Button
                onClick={startEdit}
                className="rounded-2xl border-2 border-brand-blue/20 bg-white px-6 py-6 text-brand-blue font-bold hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:scale-[1.02] transition-all duration-300 shadow-sm flex items-center gap-2"
                type="button"
              >
                <span>Change Email</span>
                <PenLine className="size-4" />
              </Button>
            </div>
          )}
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-6 rounded-2xl border-none bg-red-50 text-red-600">
            <AlertDescription className="font-medium text-xs">{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default EmailPanel;
