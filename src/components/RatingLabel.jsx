import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const RatingLabel = ({ rating, value, selectedHotel }) => {
  return (
    <div
      className={cn(
        "flex border border-white border-solid p-1 rounded-lg gap-1",
        {
          "bg-brand-blue": selectedHotel.type === value,
        }
      )}
    >
      {Array.from({ length: rating }, (_, index) => (
        <Star
          key={index}
          size={16}
          fill={selectedHotel.type === value ? "#fff" : "transparent"}
        />
      ))}
    </div>
  );
};

export default RatingLabel;
