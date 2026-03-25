"use client";

import React, { useState } from "react";
import { PenLine, Loader2, X, User, Check } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

const NamePanel = () => {
  const { userInfo, refreshUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditClick = () => {
    if (!isEditing) {
      const [currentFirst, currentLast] = userInfo.displayName?.split(" ") || [
        "",
        "",
      ];
      setFirstName(currentFirst);
      setLastName(currentLast);
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName("");
    setLastName("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("Both first name and last name are required");
      }

      const displayName = `${firstName.trim()} ${lastName.trim()}`;
      await updateProfile(auth.currentUser, {
        displayName,
      });

      await refreshUserInfo();
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditing(false);
      setFirstName("");
      setLastName("");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Error updating profile. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="relative group overflow-hidden">
      {/* Editorial Decorative Layer */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative rounded-[2.5rem] border border-slate-100 bg-white/70 backdrop-blur-md p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-brand-blue/5 text-brand-blue border border-brand-blue/10 shadow-sm">
                <User className="size-5" />
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-[0.25em] text-brand-blue/40 text-[10px] mb-0.5">
                  Identity
                </h5>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</h4>
              </div>
            </div>

            {!isEditing ? (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  {userInfo.displayName || "Not Specified"}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-3 flex items-center gap-2">
                  <span className="size-1 rounded-full bg-emerald-500" />
                  Matches official travel documentation
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">First Name</label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white focus:border-brand-blue/30 transition-all duration-300 shadow-sm"
                      placeholder="John"
                      disabled={updating}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Last Name</label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white focus:border-brand-blue/30 transition-all duration-300 shadow-sm"
                      placeholder="Doe"
                      disabled={updating}
                      required
                    />
                  </div>
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
                        <span>Confirm Changes</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="rounded-2xl border border-slate-200 bg-white px-8 h-12 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    type="button"
                    disabled={updating}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>

          {!isEditing && (
            <div className="flex shrink-0">
              <Button
                onClick={handleEditClick}
                className="rounded-3xl border border-slate-200 bg-white px-8 py-7 text-slate-800 font-bold hover:bg-slate-50 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 flex items-center gap-4 group/btn"
                type="button"
              >
                <span className="flex flex-col items-start leading-none text-left">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">Configuration</span>
                  <span className="text-sm">Edit Profile</span>
                </span>
                <div className="bg-slate-50 p-2.5 rounded-full group-hover/btn:bg-brand-blue group-hover/btn:text-white transition-all duration-300 shadow-sm">
                  <PenLine className="size-4" />
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NamePanel;
