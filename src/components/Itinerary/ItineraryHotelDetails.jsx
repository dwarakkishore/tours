"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const ItineraryHotelDetails = ({ details }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full justify-between whitespace-normal rounded bg-gradient-to-tr from-[#348901] to-[#46B301] p-6">
          <span className="text-left text-xs sm:text-center sm:text-sm">
            Click here to see hotel name and location details
          </span>
          <ArrowRightCircle className="!size-6" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[80vh] w-[calc(100%-32px)] max-w-screen-c-lg overflow-y-scroll !rounded-3xl px-8">
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>Hotel Details</AlertDialogTitle>
          </VisuallyHidden>
          <AlertDialogDescription
            dangerouslySetInnerHTML={{
              __html: details || "<p>No details available</p>",
            }}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ItineraryHotelDetails;
