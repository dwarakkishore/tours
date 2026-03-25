"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Taboola Pixel tracking component
 * Tracks page views and conversions for marketing analytics
 */
export default function TaboolaPixel() {
  useEffect(() => {
    // Make Taboola conversion tracking available globally
    if (typeof window !== "undefined") {
      window.trackTaboolaConversion = () => {
        if (window._tfa) {
          window._tfa.push({
            notify: 'event',
            name: 'lead_form_submission',
            id: 1971044
          });
        }
      };
    }
  }, []);

  return (
    <Script
      id="taboola-pixel"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          window._tfa = window._tfa || [];
          window._tfa.push({notify: 'event', name: 'page_view', id: 1971044});
          !function (t, f, a, x) {
                 if (!document.getElementById(x)) {
                    t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
                 }
          }(document.createElement('script'),
          document.getElementsByTagName('script')[0],
          '//cdn.taboola.com/libtrc/unip/1971044/tfa.js',
          'tb_tfa_script');
        `,
      }}
    />
  );
}
