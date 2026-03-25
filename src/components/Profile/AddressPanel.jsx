"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PenLine, Loader2, MapPin, X, Check } from "lucide-react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { COLLECTIONS } from "@/config";

const initialAddress = {
  street: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

const AddressPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(initialAddress);
  const [isEditing, setIsEditing] = useState(false);
  const hasAddress =
    address.street && address.city && address.state && address.pincode;

  // Fetch existing address when component mounts and user is authenticated
  useEffect(() => {
    const fetchAddress = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().address) {
          setAddress(userDoc.data().address);
          setIsEditing(false);
        } else {
          setAddress(initialAddress);
          setIsEditing(true);
        }
      } catch (error) {
        if (error.code !== "not-found") {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load address information",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
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
          address,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await setDoc(userDocRef, {
          address,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          phoneNumber: user.phoneNumber,
        });
      }

      toast({
        title: "Success",
        description: "Your address has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update address. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update address. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="relative rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 h-48 flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -ml-32 -mb-32 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative rounded-[2.5rem] border border-slate-100 bg-white/70 backdrop-blur-md p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-brand-blue/5 text-brand-blue border border-brand-blue/10 shadow-sm">
                <MapPin className="size-5" />
              </div>
              <div>
                <h5 className="font-bold uppercase tracking-[0.25em] text-brand-blue/40 text-[10px] mb-0.5">
                  Location
                </h5>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Primary Residence</h4>
              </div>
            </div>

            {!isEditing ? (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                {address.street ? (
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                      {address.street}, {address.city}
                    </h3>
                    <p className="text-lg font-bold text-slate-500 tracking-tight">
                      {address.state} {address.pincode}, {address.country}
                    </p>
                  </div>
                ) : (
                  <h3 className="text-2xl font-bold text-slate-400 tracking-tight">Not Specified</h3>
                )}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
                  <span className="size-1 rounded-full bg-slate-300" />
                  International dispatch address
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Street Address</label>
                    <Input
                      name="street"
                      value={address.street}
                      onChange={handleChange}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white focus:border-brand-blue/30 transition-all shadow-sm"
                      placeholder="123 Luxury Lane"
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">City</label>
                    <Input
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white transition-all"
                      placeholder="City"
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">State / Province</label>
                    <Input
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white transition-all"
                      placeholder="State"
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Postal Code</label>
                    <Input
                      name="pincode"
                      value={address.pincode}
                      onChange={handleChange}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white transition-all"
                      placeholder="Pincode"
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Country</label>
                    <Input
                      name="country"
                      value={address.country}
                      onChange={handleChange}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 p-6 h-14 focus:bg-white transition-all"
                      placeholder="Country"
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="rounded-2xl bg-brand-blue px-8 h-12 text-white font-bold uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-300 flex items-center gap-3"
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="size-4" />
                        <span>Confirm Location</span>
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-2xl border border-slate-200 bg-white px-8 h-12 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    disabled={saving}
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
                onClick={() => setIsEditing(true)}
                className="rounded-3xl border border-slate-200 bg-white px-8 py-7 text-slate-800 font-bold hover:bg-slate-50 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 flex items-center gap-4 group/btn"
                type="button"
              >
                <span className="flex flex-col items-start leading-none text-left">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">Logistics</span>
                  <span className="text-sm">Edit Address</span>
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

export default AddressPanel;
