"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserCircle2, PenLine, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { COLLECTIONS } from "@/config";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const GenderPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing gender when component mounts and user is authenticated
  useEffect(() => {
    const fetchGender = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().gender) {
          setGender(userDoc.data().gender);
        }
      } catch (error) {
        if (error.code !== "not-found") {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load gender information",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGender();
  }, [user, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!user) {
      setError("User not authenticated");
      setSaving(false);
      return;
    }

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          gender,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await setDoc(userDocRef, {
          gender,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          phoneNumber: user.phoneNumber,
        });
      }

      toast({
        title: "Success",
        description: "Your gender has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update gender. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update gender. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm h-full flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -ml-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative rounded-[2.5rem] border border-slate-100 bg-white/70 backdrop-blur-md p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 h-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-brand-blue/5 text-brand-blue border border-brand-blue/10 shadow-sm">
                <UserCircle2 className="size-5" />
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-[0.25em] text-brand-blue/40 text-[10px] mb-0.5">
                  Preference
                </h5>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Gender Identity</h4>
              </div>
            </div>
            {!isEditing && (
              <Button
                variant="ghost"
                className="size-10 p-0 rounded-xl hover:bg-brand-blue/5 text-slate-400 hover:text-brand-blue transition-all"
                onClick={() => setIsEditing(true)}
              >
                <PenLine className="size-4" />
              </Button>
            )}
            {isEditing && (
              <Button
                variant="ghost"
                className="size-10 p-0 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                onClick={() => setIsEditing(false)}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          <div className="flex-1">
            {!isEditing ? (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <p className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
                  {gender
                    ? GENDER_OPTIONS.find((g) => g.value === gender)?.label || gender
                    : "Not specified"}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                  <span className="size-1 rounded-full bg-slate-300" />
                  Personal identification
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="grid grid-cols-1 gap-3"
                  disabled={saving}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <Label
                      key={option.value}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group/opt",
                        gender === option.value 
                          ? "border-brand-blue bg-brand-blue/5 text-brand-blue" 
                          : "border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200 text-slate-400"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-4 rounded-full border-2 flex items-center justify-center transition-all",
                          gender === option.value ? "border-brand-blue bg-brand-blue" : "border-slate-200 bg-white"
                        )}>
                          {gender === option.value && <Check className="size-2 text-white" />}
                        </div>
                        <span className={cn("text-sm font-bold", gender === option.value ? "text-brand-blue" : "text-slate-600")}>
                          {option.label}
                        </span>
                      </div>
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    </Label>
                  ))}
                </RadioGroup>

                <Button 
                  type="submit" 
                  disabled={saving}
                  className="w-full rounded-2xl bg-brand-blue text-white font-bold h-12 hover:shadow-xl hover:shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="size-4" />
                      <span>Save Preference</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderPanel;
