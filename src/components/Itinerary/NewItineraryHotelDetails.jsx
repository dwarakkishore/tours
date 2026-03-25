"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { HotelProvider } from "@/contexts/HotelContext";
import HotelCard from "../Hotel/HotelCard";
import { useEffect, useState } from "react";
import { getHotelsByIds } from "@/utils/firebase";

// Dummy data for testing
// const HOTELS = [
//   {
//     id: 1,
//     city: "Chennai",
//     name: "CHN Hotel 1",
//     type: "3_STAR",
//     images: [
//       "https://picsum.photos/200/300",
//       "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
//       "https://picsum.photos/200/300",
//     ],
//   },
//   {
//     id: 2,
//     city: "Bangalore",
//     name: "BLR Hotel 1",
//     type: "4_STAR",
//     images: [
//       "https://picsum.photos/200/300",
//       "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
//       "https://picsum.photos/200/300",
//     ],
//   },
//   {
//     id: 3,
//     city: "Mumbai",
//     name: "MUM Hotel 1",
//     type: "5_STAR",
//     images: [
//       "https://picsum.photos/200/300",
//       "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
//       "https://picsum.photos/200/300",
//     ],
//   },
//   {
//     id: 4,
//     city: "Chennai",
//     name: "CHN Hotel 2",
//     type: "4_STAR",
//     images: [
//       "https://picsum.photos/200/300",
//       "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
//       "https://picsum.photos/200/300",
//     ],
//   },
//   {
//     id: 5,
//     city: "Bangalore",
//     name: "BLR Hotel 2",
//     type: "4_STAR",
//     images: [
//       "https://picsum.photos/200/300",
//       "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
//       "https://picsum.photos/200/300",
//     ],
//   },
//   {
//     id: 6,
//     city: "Chennai",
//     name: "CHN Hotel 3",
//     type: "5_STAR",
//     images: [
//       "https://picsum.photos/200/300",
//       "https://cdn.bayardvacations.com/images/1745231488158-Screenshot_2024-10-19_075521.png",
//       "https://picsum.photos/200/300",
//     ],
//   },
// ];

const NewItineraryHotelDetails = ({ details }) => {
  const [hotels, setHotels] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        // Collect all unique hotel IDs from all categories
        const allHotelIds = Object.entries(details)
          .filter(
            ([key, value]) =>
              key !== "baseCategory" &&
              value.hotelIds &&
              value.hotelIds.length > 0
          )
          .reduce((ids, [_, value]) => {
            return [...ids, ...value.hotelIds];
          }, []);

        if (allHotelIds.length > 0) {
          const hotelDetails = await getHotelsByIds(allHotelIds);
          setHotels(hotelDetails);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchHotelDetails();
  }, [details]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hotels || hotels.length === 0) {
    return <div>No hotels available</div>;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-between whitespace-normal rounded bg-gradient-to-tr from-brand-blue to-blue-500 p-6">
          <span className="text-left text-xs sm:text-center sm:text-sm">
            Click here to see hotel name and location details
          </span>
          <ArrowRightCircle className="!size-6" />
        </Button>
      </DialogTrigger>

      <DialogContent
        closeButton={false}
        className="max-h-[80vh] w-[calc(100%-32px)] max-w-screen-c-lg overflow-y-scroll !rounded-3xl bg-[#F8F8F8] p-0 px-8"
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

export default NewItineraryHotelDetails;
