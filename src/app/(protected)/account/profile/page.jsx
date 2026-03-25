"use client";
import Container from "@/components/ui/Container";
import NamePanel from "@/components/Profile/NamePanel";
import GenderPanel from "@/components/Profile/GenderPanel";
import PhonePanel from "@/components/Profile/PhonePanel";
import EmailPanel from "@/components/Profile/EmailPanel";
import AddressPanel from "@/components/Profile/AddressPanel";
import LogoutButton from "@/components/LogoutButton";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
  return (
    <section className="py-12 lg:py-20">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Registry Header */}
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10">
              <span className="size-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Registry details</span>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">Profile Information</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">Review and manage your personal travel identification.</p>
            </div>
          </div>

          <div className="space-y-8">
            <NamePanel />
            
            <div className="grid gap-8 lg:grid-cols-2">
              <GenderPanel />
              <PhonePanel />
            </div>

            <EmailPanel />
            <AddressPanel />

            {/* Editorial Logout Section */}
            <div className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />
              <div className="relative rounded-[2.5rem] border border-red-100 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5">
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className="p-5 rounded-3xl bg-red-50 text-red-500 border border-red-100 shadow-sm shadow-red-200/50 group-hover:scale-110 transition-transform duration-500">
                    <LogOut className="size-6" /> 
                  </div>
                  <div>
                    <h5 className="font-bold uppercase tracking-[0.3em] text-red-500/40 text-[10px] mb-1">Authorization</h5>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Access</h3>
                    <p className="text-slate-500 text-xs font-medium mt-1">Safeguard your travel data and session</p>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
