"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ProfileUpdate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();
  const { user, refreshUserInfo } = useAuth();

  useEffect(() => {
    if (user?.displayName) {
      const [first, last] = user.displayName.split(" ");
      setFirstName(first || "");
      setLastName(last || "");
    }
  }, [user]);

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
    <div>
      <Label htmlFor="phone" className="mb-4 inline-block text-lg font-medium">
        Create an Account
      </Label>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            className="rounded-xl border-[#424242] p-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            className="rounded-xl border-[#424242] p-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
        {user ? (
          <Button
            type="submit"
            className="w-full rounded-full bg-brand-blue py-6 hover:bg-brand-blue-hovered"
            disabled={updating}
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Updating Profile
              </>
            ) : (
              <>Update Profile</>
            )}
          </Button>
        ) : (
          <Button disabled className="w-full">
            Sign in to update profile
          </Button>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdate;
