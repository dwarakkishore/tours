"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const Breadcrumbs = ({ items, className, omitContainer, colorClasses, activeColorClasses }) => {
  if (!items || items.length === 0) return null;

  // Generate JSON-LD BreadcrumbList markup
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://bayardvacations.com${item.href}`,
    })),
  };

  return (
    <div className={cn("bg-slate-50 py-4 border-b border-slate-100", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {omitContainer ? (
        <nav aria-label="Breadcrumb">
          <ol className={cn("flex items-center gap-2 text-sm font-medium list-none p-0 m-0 flex-nowrap", colorClasses || "text-slate-500")}>
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2 min-w-0">
                {index > 0 && <ChevronRight className={cn("w-4 h-4", colorClasses ? "opacity-70" : "text-slate-400")} />}
                {item.active ? (
                  <span className={cn("truncate", activeColorClasses || "text-slate-900")} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-brand-blue transition-colors truncate"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className={cn("flex items-center gap-2 text-sm font-medium list-none p-0 m-0 flex-nowrap", colorClasses || "text-slate-500")}>
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 min-w-0">
                  {index > 0 && <ChevronRight className={cn("w-4 h-4", colorClasses ? "opacity-70" : "text-slate-400")} />}
                  {item.active ? (
                    <span className={cn("truncate", activeColorClasses || "text-slate-900")} aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-brand-blue transition-colors truncate"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      )}
    </div>
  );
};

export default Breadcrumbs;
