"use client";
import React from "react";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const LogoutButton = () => {
  const { refreshUserInfo } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await refreshUserInfo();
      // Redirect to login page after successful logout
      // Force a full page reload and redirect to login
      window.location.href = "/login";
    } catch (error) {
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      className="rounded-xl py-6"
    >
      <span>Logout</span>
      <LogOut className="!size-4" />
    </Button>
  );
};

export default LogoutButton;
