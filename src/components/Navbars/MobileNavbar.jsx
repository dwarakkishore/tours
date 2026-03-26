"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import {
  Search,
  X,
  CircleUserRound,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import navbarData from "./navbarData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import MobileSearch from "../Landing/MobileSearch";
import useModal from "@/hooks/useModal";

export default function MobileNavbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [atTop, setAtTop] = useState(true);
  const [forceHide, setForceHide] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const { user } = useAuth();
  const { isOpen } = useModal();

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleForceHide = (e) => setForceHide(e.detail);
    window.addEventListener('hideMainHeader', handleForceHide);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('hideMainHeader', handleForceHide);
    };
  }, []);

  /* ================= NAV AUTO-CLOSE ================= */
  useEffect(() => {
    setIsMenuActive(false);
    setIsDropdownActive(false);
  }, [pathname]);

  /* ================= BODY LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isMenuActive ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMenuActive]);

  const handleMenuToggle = () => {
    setIsMenuActive((p) => !p);
  };

  /* ================= HEADER STATE ================= */
  const isHeroPage = isHome || 
                     pathname === "/explore" ||
                     pathname === "/about" || 
                     pathname === "/faq" || 
                     pathname === "/login" || 
                     pathname?.startsWith("/why-choose") ||
                     pathname?.startsWith("/blogs") ||
                     pathname?.startsWith("/packages/");
  const showGradient = !isHeroPage || !atTop || isMenuActive;

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={cn(
        "fixed top-0 z-[9999] w-full block lg:hidden transition-all duration-500",
        (forceHide || isOpen) ? "-translate-y-[110%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      )}>
        <Container>
          <div
            className={cn(
              "relative mx-auto rounded-full overflow-hidden transition-all duration-300",
              showGradient
                ? "backdrop-blur-xl mt-4"
                : "mt-0"
            )}
            style={{
              height: "64px",
              backgroundColor: showGradient
                ? "rgba(0, 0, 0, 0.6)"
                : "transparent",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* NAV */}
            <nav className="flex h-16 items-center gap-4 px-5 text-white">
              <Link href="/" prefetch={false}>
                <Image
                  src="/Bayard_white_logo.svg"
                  width={160}
                  height={32}
                  alt="Logo"
                  className="w-[110px] sm:w-[130px] h-auto"
                />
              </Link>

              <div className="ml-auto flex items-center gap-3">
                {!isHome && (
                  <MobileSearch 
                    customTrigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Search destinations"
                        className="text-white hover:bg-white/20"
                      >
                        <Search />
                      </Button>
                    }
                  />
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuToggle}
                  aria-label={isMenuActive ? "Close menu" : "Open menu"}
                  className="text-white hover:bg-white/20"
                >
                  {isMenuActive ? <X /> : <Menu />}
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </header>

      {/* ================= MENU DRAWER (SIDEBAR) ================= */}
      <ul
        className={cn(
          "fixed inset-0 z-[1000] flex flex-col pt-28 px-6 pb-20 text-white transition-all duration-300",
          isMenuActive ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none invisible"
        )}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Side bar search removed as requested */}


        {navbarData.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-5 text-xl font-bold border-b border-white/20"
          >
            {item.hasDropdown ? (
              <button
                className="flex w-full justify-between"
                aria-label={`View ${item.title} sub-menu`}
                onClick={() => {
                  setActiveItem(item);
                  setIsDropdownActive(true);
                }}
              >
                {item.title}
                <ChevronRight />
              </button>
            ) : (
              <Link href={item.href} onClick={handleMenuToggle} prefetch={false}>
                {item.title}
              </Link>
            )}
          </li>
        ))}

        <div className="mt-auto space-y-4">
          {user ? (
            <>
              <Link
                href="/account/profile"
                onClick={handleMenuToggle}
                prefetch={false}
                className="flex justify-center gap-2 rounded-full bg-white py-3 text-brand-blue"
              >
                <CircleUserRound /> View Profile
              </Link>

              <button
                onClick={async () => {
                  try {
                    await signOut(auth);
                    handleMenuToggle();
                    window.location.href = "/login";
                  } catch (error) {
                    console.error("Logout failed:", error);
                  }
                }}
                className="w-full text-center rounded-full border border-white py-3 hover:bg-white/10 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={handleMenuToggle}
              prefetch={false}
              className="flex justify-center gap-2 rounded-full bg-white py-3 text-brand-blue"
            >
              <CircleUserRound /> Login
            </Link>
          )}

          <Link
            href="/contact"
            onClick={handleMenuToggle}
            prefetch={false}
            className="block text-center rounded-full border border-white py-3"
          >
            Contact Us
          </Link>
        </div>
      </ul>

      {/* ================= DROPDOWN ================= */}
      <ul
        className={cn(
          "fixed inset-0 z-[1100] text-white transition-transform duration-300 pt-24 px-6 overflow-y-auto",
          isDropdownActive ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Button
          onClick={() => setIsDropdownActive(false)}
          className="mb-6 flex gap-2 rounded-full bg-white/10 text-white border border-white/20 px-4 py-2 hover:bg-white/20"
        >
          <ChevronLeft /> Back
        </Button>

        {activeItem &&
          activeItem.dropdownContent({
            isHeaderFixed: true,
            handleMenuActive: () => {
              setIsDropdownActive(false);
              setIsMenuActive(false);
            },
          })}
      </ul>
    </>
  );
}
