'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DesktopNavbar from '@/components/Navbars/DesktopNavbar';
import MobileNavbar from '@/components/Navbars/MobileNavbar';

// Dynamic imports for heavy layout components
const LeadForm = dynamic(() => import('@/components/Forms/EnquiryForm/LeadForm'));
const LeadGenerationTrigger = dynamic(() => import('@/components/Forms/EnquiryForm/LeadGenerationTrigger'));
const UnifiedContactButtons = dynamic(() => import('@/components/UnifiedContactButtons'));
const AuthModal = dynamic(() => import('@/components/Forms/LoginForm/AuthModal'));

export default function LayoutWrapper({ children, footer }) {
  const pathname = usePathname();
  const isShareRoute = pathname?.startsWith('/share');

  useEffect(() => {
    // Smoothly hide the static HTML splash screen once React takes over
    const splash = document.getElementById("bayard-splash-screen");
    if (splash && !splash.classList.contains('fade-out')) {
      splash.classList.add('fade-out');
      setTimeout(() => { splash.style.display = 'none'; }, 800);
    }
  }, []);

  return (
    <>
      {/* Only show main navigation if NOT on share route */}
      {!isShareRoute && (
        <>
          <DesktopNavbar />
          <MobileNavbar />
        </>
      )}
      
      {children}
      
       {/* Only show main site components if NOT on share route */}
      {!isShareRoute && (
        <>
          <LeadForm />
          <LeadGenerationTrigger />
          <UnifiedContactButtons />
          {footer}
          <AuthModal />
        </>
      )}
    </>
  );
}
