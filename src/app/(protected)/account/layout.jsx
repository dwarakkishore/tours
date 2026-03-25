"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const AccountLayout = ({ children }) => {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  const navLinks = [
    { href: "/account/profile", label: "My Account" },
    { href: "/account/bookings", label: "Booking History" },
    { href: "/account/docs", label: "Documents Upload" },
  ];

  return (
    <>
      <section className="relative pt-32 lg:pt-44 overflow-hidden">
        {/* Editorial Hero Background */}
        <div className="absolute inset-0 z-0 bg-brand-deep">
          <Image
            src="/img/highlights/luxury-resort.png"
            alt="Luxury Resort"
            fill
            className="object-cover opacity-60 brightness-[0.85] saturate-[0.9]"
            priority
          />
          {/* Refined Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/60 via-brand-deep/20 to-brand-deep/80" />
          <div className="absolute inset-0 bg-brand-deep/30" />
        </div>

        <div className="relative z-10">
          <Container>
            <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Personal Dashboard</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-none">
                Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{userInfo.displayName || "Traveler"}</span>
              </h1>
            </div>

            <nav className="max-w-2xl mx-auto relative group">
              {/* Glassmorphism Tab Bar */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <ul className="relative flex items-center justify-between p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href} className="flex-1">
                      <Link
                        href={link.href}
                        className={cn(
                          "block text-center py-3.5 px-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300",
                          isActive 
                            ? "bg-white text-brand-blue shadow-lg scale-[1.02]" 
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Container>
        </div>
      </section>
      <div className="bg-[#FCFCFD] min-h-screen">{children}</div>
    </>
  );
};

export default AccountLayout;
