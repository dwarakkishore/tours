import Container from "@/components/ui/Container";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import GroupDepartureSlider from "../ui/sliders/GroupDepartureSlider";
import { cn } from "@/lib/utils";

export default function GroupDeparture({ groupDeparturePackages }) {
  return (
    <section className="bg-white relative">
      <Container>
        {/* Simple Header */}
        <div className="mb-4 md:mb-6 c-lg:mb-8 text-center c-lg:text-left">
          <div className="flex flex-col c-lg:flex-row c-lg:items-center justify-between gap-4 c-lg:gap-6">
            <div className="flex-1">
              <h2 className="section-title-light mb-1 md:mb-2 c-lg:mb-4">
                <span className="c-lg:hidden">Group Departures</span>
                <span className="hidden c-lg:inline">Curated Group Departures</span>
              </h2>
              <p className="section-subtitle-light hidden sm:block max-w-2xl text-xs sm:text-sm md:text-base">
                Hand-crafted itineraries designed for explorers who believe that the best stories are written together.
              </p>
            </div>
            
            <div className="flex flex-col c-lg:flex-row items-center gap-4">
              <Link
                href="/themes/group-departure"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white hover:bg-brand-blue-hovered transition-all font-semibold text-sm whitespace-nowrap"
              >
                View All Departures
                <ArrowRight className="size-4" />
              </Link>
              
              <div className="hidden c-lg:flex items-center gap-3">
                <button className="swiper-prev-group w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="swiper-next-group w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mb-0 sm:mb-6">
          {groupDeparturePackages && groupDeparturePackages.length > 0 ? (
            <GroupDepartureSlider groupDeparturePackages={groupDeparturePackages} />
          ) : (
            <div className="h-[520px] w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-semibold">
              Experience the Extraordinary
            </div>
          )}
        </div>

      </Container>
    </section>
  );
}
