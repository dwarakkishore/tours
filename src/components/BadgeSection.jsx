import { OfferIcon, BestsellerIcon, TrendingIcon } from "@/components/Icons";
import { File, HandCoins, Pencil, TicketsPlane } from "lucide-react";
import { format } from "date-fns";
import { PACKAGE_TAGS } from "@/config";

// BadgeSection Component - Modern Premium Badges

export default function BadgeSection({ item }) {
  // Modern glass-morphism badge style
  const baseStyle =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-white backdrop-blur-md border border-white/20 shadow-lg tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap";

  // Premium color schemes with glass effect
  const BADGE_STYLES = {
    OFFER: "bg-gradient-to-r from-emerald-500/90 to-green-500/90",
    BESTSELLER: "bg-gradient-to-r from-orange-500/90 to-amber-500/90",
    TRENDING: "bg-gradient-to-r from-orange-600/90 to-yellow-500/90",
    VISAFREE: "bg-gradient-to-r from-blue-500/90 to-cyan-500/90",
    CURATED: "bg-gradient-to-r from-red-500/90 to-rose-500/90",
    VALUE: "bg-gradient-to-r from-green-600/90 to-emerald-600/90",
    UNDERRATED: "bg-gradient-to-r from-purple-500/90 to-violet-500/90",
    TAILORED: "bg-gradient-to-r from-amber-400/90 to-yellow-600/90",
  };

  const badges = [];

  // 1. OFFER - Green Glass Badge
  if (item.offerPrice) {
    badges.push(
      <div
        key="offer"
        className={`${baseStyle} ${BADGE_STYLES.OFFER}`}
      >
        <OfferIcon className="size-3.5 drop-shadow-sm" />
        <span className="drop-shadow-sm">Ends {format(item.offerEndDate, "d MMM")}</span>
      </div>
    );
  }

  // 2. BESTSELLER - Orange Glass Badge
  if (item.bestseller || item.packageTags?.includes("bestseller")) {
    badges.push(
      <div
        key="bestseller"
        className={`${baseStyle} ${BADGE_STYLES.BESTSELLER}`}
      >
        <BestsellerIcon className="size-3.5 drop-shadow-sm" />
        <span className="drop-shadow-sm">Bestseller</span>
      </div>
    );
  }

  // 3. TRENDING - Pink Glass Badge
  if (item.trending || item.packageTags?.includes("trending")) {
    badges.push(
      <div
        key="trending"
        className={`${baseStyle} ${BADGE_STYLES.TRENDING}`}
      >
        <TrendingIcon className="size-3.5 drop-shadow-sm" />
        <span className="drop-shadow-sm">Trending</span>
      </div>
    );
  }

  // 4. VISA FREE - Blue Glass Badge
  if (item.packageTags?.includes(PACKAGE_TAGS.VISAFREE)) {
    badges.push(
      <div
        key="visafree"
        className={`${baseStyle} ${BADGE_STYLES.VISAFREE}`}
      >
        <File className="size-3.5 drop-shadow-sm" />
        <span className="drop-shadow-sm">Visa Free</span>
      </div>
    );
  }

  // 5. CURATED - Red Glass Badge
  if (item.packageTags?.includes(PACKAGE_TAGS.CURATED)) {
    badges.push(
      <div
        key="curated"
        className={`${baseStyle} ${BADGE_STYLES.CURATED}`}
      >
        <Pencil className="size-3 drop-shadow-sm" />
        <span className="drop-shadow-sm">Curated</span>
      </div>
    );
  }

  // 6. VALUE - Green Glass Badge
  if (item.packageTags?.includes(PACKAGE_TAGS.VALUE)) {
    badges.push(
      <div
        key="value"
        className={`${baseStyle} ${BADGE_STYLES.VALUE}`}
      >
        <HandCoins className="size-3.5 drop-shadow-sm" />
        <span className="drop-shadow-sm">Great Value</span>
      </div>
    );
  }

  // 7. UNDERRATED - Purple Glass Badge
  if (item.packageTags?.includes(PACKAGE_TAGS.UNDERRATED)) {
    badges.push(
      <div
        key="underrated"
        className={`${baseStyle} ${BADGE_STYLES.UNDERRATED}`}
      >
        <TicketsPlane className="size-3.5 drop-shadow-sm" />
        <span className="drop-shadow-sm">Underrated</span>
      </div>
    );
  }

  // 8. TAILORED TAGS - Gold Glass Badges
  if (item.tailored_tag) {
    const Sparkles = ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-6.857 2.286L12 21l-2.286-6.857L3 12l6.857-2.286L12 3z" />
      </svg>
    );

    const formatLabel = (tag) => {
      if (typeof tag !== "string") return "";
      return tag
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const tagsArray = Array.isArray(item.tailored_tag) 
      ? item.tailored_tag 
      : (typeof item.tailored_tag === "string" && item.tailored_tag ? [item.tailored_tag] : []);

    tagsArray.forEach((tag, idx) => {
      if (typeof tag === "string" && tag) {
        badges.push(
          <div
            key={`tailored-${tag}-${idx}`}
            className={`${baseStyle} ${BADGE_STYLES.TAILORED}`}
          >
            <Sparkles className="size-3.5 drop-shadow-sm" />
            <span className="drop-shadow-sm">{formatLabel(tag)}</span>
          </div>
        );
      }
    });
  }

  if (badges.length === 0) return null;

  // Rule: Max show 1 tag only for maximum clarity
  const displayBadges = badges.slice(0, 1);

  return (
    <div className="flex gap-2 max-w-[calc(100%-110px)] relative z-20">
      {displayBadges}
    </div>
  );
}
