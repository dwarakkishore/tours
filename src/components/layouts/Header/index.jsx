// Header.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderNav from "./HeaderNav";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRegionsData } from "@/hooks/regions";

const Header = () => {
  const { internationalRegions, domesticRegions } = useRegionsData();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const headerWrapperRef = useRef(null);
  const [headerTheme, setHeaderTheme] = useState("dark");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const headerHeight = 90;
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    isOpen: false,
    content: null,
    title: null,
    position: null,
    previousPosition: null,
    slugs: [],
  });

  const handleDropdownOpen = ({ isOpen, content, title, position, slugs }) => {
    setIsDropdownOpen((prev) => ({
      isOpen,
      content,
      title,
      position,
      slugs,
      previousPosition: prev.position,
    }));
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen({
      isOpen: false,
      content: null,
      title: null,
      position: null,
      previousPosition: null,
    });
  };

  useEffect(() => {
    if (isSearchBarVisible) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isSearchBarVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleDropdownClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getSlideDirection = () => {
    if (!isDropdownOpen.previousPosition || !isDropdownOpen.position) return 0;
    return isDropdownOpen.previousPosition.x > isDropdownOpen.position.x
      ? 20
      : -20;
  };

  const handleShowSearchBar = () => {
    setIsSearchBarVisible(true);
  };

  const handleHideSearchBar = () => {
    setIsSearchBarVisible(false);
  };

  const handleMouseLeave = () => {
    handleDropdownClose();
  };

  useEffect(() => {
    const checkSectionPosition = () => {
      const blueSections = document.querySelectorAll(".blue-section");
      let isOnBlueSection = false;

      blueSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if section's top edge is at header height from viewport top
        if (Math.abs(rect.top - headerHeight) < 1) {
          isOnBlueSection = true;
        }
      });

      setHeaderTheme(isOnBlueSection ? "light" : "dark");
    };

    window.addEventListener("scroll", checkSectionPosition);
    // Initial check
    checkSectionPosition();

    return () => {
      window.removeEventListener("scroll", checkSectionPosition);
    };
  }, []);

  return (
    <div
      ref={headerWrapperRef}
      onMouseLeave={handleMouseLeave}
      className="fixed top-[200px] z-50 w-full"
    >
      <header className="h-16">
        <AnimatePresence>
          {!isSearchBarVisible && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-20 h-full"
            >
              <Container
                className={cn("h-full rounded-full ", {
                  "bg-[#0146b3]": headerTheme === "dark",
                  "bg-white": headerTheme === "light",
                })}
              >
                <div className="flex size-full items-center justify-between px-3">
                  <div>
                    <Link href="/" prefetch={false}>
                      <Image
                        width={150}
                        height={30}
                        alt="Bayard Vacations Logo"
                        src="/Bayard_white_logo.svg"
                        className="h-auto"
                      />
                    </Link>
                  </div>
                  <div>
                    <HeaderNav 
                      onHover={handleDropdownOpen} 
                      internationalRegions={internationalRegions}
                      domesticRegions={domesticRegions}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      className="rounded-full text-white hover:text-brand-blue"
                      variant="ghost"
                      size="icon"
                      onClick={handleShowSearchBar}
                    >
                      <Search />
                    </Button>
                    <Button variant={"outline-white"} asChild>
                      <Link href="/" prefetch={false}>Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSearchBarVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "64px", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-1/2 top-0 z-30 flex size-full max-w-[800px] -translate-x-1/2 items-center overflow-hidden rounded-full bg-slate-200 px-7"
            >
              <div>
                <Search className="text-slate-400" />
              </div>
              <div className="h-full flex-1 px-5">
                <Input
                  ref={inputRef}
                  className="h-full border-0 text-xl text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                  placeholder="Search for Packages, Destinations etc."
                />
              </div>
              <div>
                <Button
                  className="size-6 rounded-full bg-white p-0 text-brand-blue shadow-none hover:bg-brand-blue hover:text-white"
                  onClick={handleHideSearchBar}
                >
                  <X />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdown panel */}
        <div
          ref={dropdownRef}
          className={cn(
            "absolute top-[10px] h-0 w-full overflow-hidden transition-all duration-500",
            {
              "h-[420px]": isDropdownOpen.isOpen,
            }
          )}
        >
          <Container className="h-full rounded-[32px] bg-[#0146b3]">
            <AnimatePresence mode="wait">
              {isDropdownOpen.isOpen && (
                <motion.div
                  key={isDropdownOpen.title}
                  initial={{ opacity: 0, x: getSlideDirection() }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -getSlideDirection() }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="grid h-full grid-cols-4 content-start gap-8 px-3 pt-20"
                >
                  {isDropdownOpen.title !== "Explore Packages"
                    ? isDropdownOpen.content.map((item, i) => (
                        <Link
                          className="text-white opacity-80 transition-opacity hover:opacity-100"
                          href={isDropdownOpen.slugs?.[i] ? `/packages/${isDropdownOpen.slugs[i]}` : "/"}
                          prefetch={false}
                          key={i}
                        >
                          {item}
                        </Link>
                      ))
                    : isDropdownOpen.content.map((item, i) => (
                        <Link
                          className="text-white opacity-100 transition-opacity"
                          href={`/themes/${item.slug.split("?")[0]}`}
                          prefetch={false}
                          key={i}
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={40}
                              height={40}
                            />
                            <div>
                              <h4 className="text-lg">{item.title}</h4>
                              <span className="text-xs">{item.subtitle}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </div>
      </header>
    </div>
  );
};

export default Header;
