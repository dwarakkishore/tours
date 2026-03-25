import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCheckout } from "@/contexts/CheckoutContext";
import { toast } from "@/hooks/use-toast";
import { formatDateTime } from "@/utils/itinerary";
import { storeLead } from "@/utils/firebase";
import { trackLeadFormConversion } from "@/utils/conversion";

const SingleCheckout = ({ isOpen, setIsOpen, region, days }) => {
  const { userInfo } = useAuth();
  const { departureDate, checkoutMessage, departureCity } = useCheckout();
  const [isSingleConfirmed, setIsSingleConfirmed] = useState(false);

  const handleSendLeadInfo = async () => {
    const formData = {
      name: userInfo.displayName,
      email: userInfo.email,
      contactNumber: userInfo.phoneNumber,
      departureDate,
      numTravellers: 1,
      destination: region || "",
      departureCity,
      message: checkoutMessage,
      numDays: days,
      isSingle: true,
    };

    try {
      const response = await storeLead({
        ...formData,
        departureDate: formatDateTime(formData.departureDate),
      });

      if (response) {
        trackLeadFormConversion();
        toast("Success", {
          description:
            "Form submitted, Our team will get in touch with you soon",
        });
      }

      setIsSingleConfirmed(true);
    } catch (error) {
      toast("Failed", {
        description: "Form submission failed. Try after sometime",
      });
    }
  };

  useEffect(() => {
    setIsSingleConfirmed(false);
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="w-[calc(100%)-32px] max-w-screen-c-md !rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {!isSingleConfirmed
              ? "Are you sure you want to travel Alone?"
              : " "}
          </AlertDialogTitle>
          {!isSingleConfirmed && (
            <AlertDialogDescription>
              Single booking prices will vary. If travelling alone confirm the
              same.
            </AlertDialogDescription>
          )}
          {isSingleConfirmed && (
            <AlertDialogDescription>
              We&apos;ve registered your interest to travel alone. Your details
              have been submitted to our team. They will get back to you soon.
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {!isSingleConfirmed && (
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleSendLeadInfo}
              className="rounded-xl bg-brand-blue p-6 hover:bg-brand-blue-hovered"
            >
              Yes I&apos;m Traveling alone
            </Button>
          </AlertDialogFooter>
        )}

        {isSingleConfirmed && (
          <AlertDialogFooter>
            <Button
              className="rounded-xl bg-brand-blue p-6 hover:bg-brand-blue-hovered"
              onClick={() => setIsOpen(false)}
            >
              Ok!
            </Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SingleCheckout;
