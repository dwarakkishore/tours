"use client";

import React, { useEffect, Suspense } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import LoginForm from "@/components/Forms/LoginForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginContent = () => {
  const { user, userInfo } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback") || "/account/profile";

  useEffect(() => {
    if (
      user &&
      userInfo.phoneNumber &&
      userInfo.displayName &&
      userInfo.displayName?.trim() !== "" &&
      userInfo.email
    ) {
      router.replace(callbackUrl);
    }
  }, [
    user,
    userInfo.phoneNumber,
    userInfo.displayName,
    userInfo.email,
    callbackUrl,
    router,
  ]);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/login-bg.jpg"
          alt="Login Background"
          fill
          className="object-cover opacity-60 grayscale-[20%]"
          priority
        />
        {/* Multi-layered Gradients for Premium Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/40 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <Container className="relative z-10 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          {/* Left Content: Value Proposition */}
          <div className="text-white space-y-6 lg:space-y-8 animate-fadeInLeft">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/20 backdrop-blur-md border border-brand-blue/30">
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Exclusive Access</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter">
              Travel To Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400">
                Dream Location
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-md leading-relaxed font-medium">
              Join the elite circle of travelers. Embark on a journey defined by luxury, comfort, and unforgettable memories.
            </p>

            {/* Quick Benefits */}
            <div className="flex flex-col gap-4 pt-4">
              {['Custom Itineraries', '24/7 Expert Support', 'Exclusive Member Rates'].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-sm font-bold text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Login Card */}
          <div className="relative animate-fadeInRight">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-brand-blue/20 rounded-[40px] blur-3xl opacity-50" />
            
            <div className="relative bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-2xl shadow-black/40 border border-white/50">
              <div className="mb-10 text-center lg:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  Welcome Back
                </span>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Login to your account</h2>
              </div>

              <LoginForm callbackUrl={callbackUrl} />

              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-center text-slate-500 text-xs font-medium">
                  By continuing, you agree to our <br className="md:hidden" />
                  <a href="/terms" className="text-brand-blue font-bold hover:underline">Terms of Service</a> and <a href="/privacy" className="text-brand-blue font-bold hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Background Decor Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
    </main>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
