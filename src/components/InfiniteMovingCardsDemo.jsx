import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo({ reviews }) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden antialiased">
      <InfiniteMovingCards items={reviews} direction="left" speed="slow" />
    </div>
  );
}
