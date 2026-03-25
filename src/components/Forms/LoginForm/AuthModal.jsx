"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import useModal from "@/hooks/useModal";
import LoginForm from "./index";
import { Button } from "@/components/ui/button";

export default function AuthModal() {
  const { isAuthOpen, closeAuthModal } = useModal();

  return (
    <Dialog open={isAuthOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="max-w-[450px] !rounded-3xl bg-white p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="relative p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-left font-bold text-2xl text-slate-900 tracking-tight">
              Sign In
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeAuthModal}
              className="rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="size-5 text-slate-400" />
            </Button>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Access exclusive travel features and itineraries.
          </p>
        </DialogHeader>
        
        <div className="p-8 pt-6">
          <LoginForm onSuccess={closeAuthModal} />
        </div>

        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-[11px] text-slate-400 font-medium">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-brand-blue font-bold hover:underline">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="text-brand-blue font-bold hover:underline">Privacy Policy</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
