"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import HotelCard from "./HotelCard";
import { HotelProvider } from "@/contexts/HotelContext";

const HOTELS = [
  {
    id: 1,
    city: "Chennai",
    name: "CHN Hotel 1",
    type: "3_STAR",
    images: [
      "https://picsum.photos/200/300",
      "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
      "https://picsum.photos/200/300",
    ],
  },
  {
    id: 2,
    city: "Bangalore",
    name: "BLR Hotel 1",
    type: "4_STAR",
    images: [
      "https://picsum.photos/200/300",
      "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
      "https://picsum.photos/200/300",
    ],
  },
  {
    id: 3,
    city: "Mumbai",
    name: "MUM Hotel 1",
    type: "5_STAR",
    images: [
      "https://picsum.photos/200/300",
      "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
      "https://picsum.photos/200/300",
    ],
  },
  {
    id: 4,
    city: "Chennai",
    name: "CHN Hotel 2",
    type: "4_STAR",
    images: [
      "https://picsum.photos/200/300",
      "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
      "https://picsum.photos/200/300",
    ],
  },
  {
    id: 5,
    city: "Bangalore",
    name: "BLR Hotel 2",
    type: "4_STAR",
    images: [
      "https://picsum.photos/200/300",
      "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
      "https://picsum.photos/200/300",
    ],
  },
  {
    id: 6,
    city: "Chennai",
    name: "CHN Hotel 3",
    type: "5_STAR",
    images: [
      "https://picsum.photos/200/300",
      "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
      "https://picsum.photos/200/300",
    ],
  },
];

const HotelExplorer = () => {
  const hotels = HOTELS;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!hotels) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent
        closeButton={false}
        className="max-w-4xl overflow-y-auto rounded-2xl bg-[#F8F8F8] p-0"
      >
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Hotel Explorer</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <Button
          variant="icon"
          onClick={() => setIsDialogOpen(false)}
          className={
            "absolute right-4 top-4 size-8 rounded-full bg-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          }
        >
          <X className="size-4 text-brand-blue" />
        </Button>
        <HotelProvider hotels={hotels}>
          <HotelCard />
        </HotelProvider>
      </DialogContent>
    </Dialog>
  );
};

export default HotelExplorer;
