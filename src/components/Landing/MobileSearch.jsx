"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoveRight, Search, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState, useRef, useEffect } from "react";
import useToggleState from "@/hooks/useToggleState";
import { searchPackages } from "@/utils/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { TRENDING_PACKAGES } from "@/config";
import { cn } from "@/lib/utils";

export default function MobileSearch({ customTrigger }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    regions: [],
    packages: [],
  });
  const [loading, setLoading] = useState(false);

  const { state, toggle } = useToggleState(false);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    if (state) toggle();
  }, [pathname]);

  /* ---------------- Event Trigger to Hide Main Header ---------------- */
  useEffect(() => {
    if (state) {
      window.dispatchEvent(new CustomEvent('hideMainHeader', { detail: true }));
    } else {
      window.dispatchEvent(new CustomEvent('hideMainHeader', { detail: false }));
    }
    
    return () => {
      window.dispatchEvent(new CustomEvent('hideMainHeader', { detail: false }));
    };
  }, [state]);

  /* ---------------- Debounced Search ---------------- */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults({ regions: [], packages: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await searchPackages(searchTerm);
        setSearchResults(data || { regions: [], packages: [] });
      } catch {
        setSearchResults({ regions: [], packages: [] });
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  const handleClose = () => {
    setSearchTerm("");
    setSearchResults({ regions: [], packages: [] });
    setLoading(false);
    toggle();
  };

  /* ================================================== */
  return (
    <Dialog open={state} onOpenChange={toggle}>
      {/* ================= TRIGGER ================= */}
      <DialogTrigger asChild>
        {customTrigger || (
          <button
            type="button"
            suppressHydrationWarning
            className="
              sm:hidden
              flex items-center gap-3
              px-5 py-3
              rounded-full
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              text-white/90
              w-full
              cursor-pointer
              text-left
              outline-none
            "
          >
            <Search className="size-5 shrink-0" />
            <span className="text-sm">Where to next?</span>
          </button>
        )}
      </DialogTrigger>

      {/* ================= FULL SCREEN CONTENT ================= */}
      <DialogContent 
        className={cn(
          "!fixed !inset-0 !translate-x-0 !translate-y-0 !w-full !h-full !max-w-none !rounded-none !border-none",
          "!z-[10005] flex flex-col bg-white p-0 m-0 overflow-hidden"
        )}
        onOpenAutoFocus={(e) => {
          setTimeout(() => inputRef.current?.focus(), 150);
        }}
      >
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>

        {/* ---------- SIMPLE HEADER ---------- */}
        <div className="shrink-0 bg-white border-b border-slate-100 flex items-center px-4 h-20 pt-6">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                <Search className="size-5 text-slate-400 shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search destinations..."
                    className="
                        flex-1
                        bg-transparent
                        border-none
                        focus:ring-0
                        text-base
                        text-slate-900
                        placeholder:text-slate-400
                        outline-none
                        w-full
                    "
                    autoComplete="off"
                />
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-900 ml-1"
            >
              <X className="size-6" />
            </Button>
        </div>

        {/* ---------- CONTENT AREA ---------- */}
        <div className="flex-1 overflow-y-auto px-5 py-4 bg-white">
          <div className="max-w-md mx-auto">
            {loading ? (
              <p className="text-center py-10 text-slate-400 text-sm">Searching...</p>
            ) : searchTerm &&
              searchResults.regions.length === 0 &&
              searchResults.packages.length === 0 ? (
              <p className="text-center py-10 text-slate-400 text-sm">No results found for "{searchTerm}"</p>
            ) : searchTerm ? (
              <div className="space-y-6">
                {/* Regions */}
                {searchResults.regions?.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2 px-1">Regions</h4>
                    <div className="divide-y divide-slate-50">
                      {searchResults.regions.map((region) => (
                        <Link
                          key={region.slug}
                          href={`/packages/${region.slug}`}
                          onClick={handleClose}
                          className="flex items-center justify-between py-4 group active:bg-slate-50 transition-colors"
                        >
                          <span className="text-lg text-slate-700 capitalize font-medium">{region.name}</span>
                          <MoveRight className="size-5 text-slate-300 group-active:text-brand-blue" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Packages */}
                {searchResults.packages?.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2 px-1">Packages</h4>
                    <div className="space-y-4">
                      {searchResults.packages.map((pkg) => (
                        <Link
                          key={pkg.id}
                          href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                          onClick={handleClose}
                          className="flex gap-4 items-center group active:bg-slate-50 rounded-xl"
                        >
                          {pkg.bannerImages?.[0]?.url && (
                             <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                                <Image
                                  src={pkg.bannerImages[0].url}
                                  alt={pkg.packageName}
                                  fill
                                  className="object-cover"
                                />
                             </div>
                          )}
                          <div className="min-w-0 flex-1 flex flex-col justify-center">
                            <p className="text-[15px] font-bold text-slate-800 line-clamp-1 group-active:text-brand-blue transition-colors">
                              {pkg.packageName}
                            </p>
                            <p className="text-xs text-slate-400 capitalize font-medium">
                               {pkg.region}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Quick Links</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {TRENDING_PACKAGES.map((pkg) => (
                    <Link
                      key={pkg}
                      href={`/packages/${pkg}`}
                      onClick={handleClose}
                      className="flex items-center justify-between py-4 px-5 bg-slate-50 rounded-2xl group active:bg-brand-blue/5 transition-all"
                    >
                      <span className="text-lg text-slate-700 capitalize font-semibold">{pkg}</span>
                      <MoveRight className="size-5 text-slate-300 group-active:text-brand-blue" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
