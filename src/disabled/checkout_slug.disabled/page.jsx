"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingDetails from "@/components/Checkout/BookingDetails";
import DepartureDate from "@/components/Checkout/DepartureDate";
import TravellerCount from "@/components/Checkout/TravellerCount";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";
import CheckoutMessage from "@/components/Checkout/CheckoutMessage";
import SpecialOccasion from "@/components/Checkout/SpecialOccasion";
import { useParams } from "next/navigation";
import { useCheckout } from "@/contexts/CheckoutContext";
import { useAuth } from "@/contexts/AuthContext";
import SingleCheckout from "@/components/Checkout/SingleCheckout";
import {
  getPackageWithAllReferences,
  storeBookings,
  storePayments,
} from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "sonner";
import { COLLECTIONS } from "@/config";

const CheckoutPage = () => {
  const params = useParams();
  const slug = React.useMemo(() => params?.slug, [params]);
  const [selectedPackage, setSelectedPackage] = useState();
  const { user } = useAuth();

  const {
    bookingDetails,
    numAdults,
    numChildren,
    numToddler,
    checkoutMessage,
    specialOccasion,
    departureDate,
    departureCity,
  } = useCheckout();

  const [grandTotal, setGrandTotal] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getPackageWithAllReferences(slug, {
          bySlug: true,
        });

        setSelectedPackage(response);
      } catch (err) {
      }
    };

    getData();
    // eslint-disable-next-line
  }, []);

  const handleBooking = async () => {
    const isSingle = numAdults === 1;

    const newBooking = {
      userId: user.uid,
      packageSlug: selectedPackage.packageSlug,
      paymentStatus: "pending",
      amount: grandTotal,
      currency: "INR",
      packageSnapshot: {
        packageTitle: selectedPackage.packageTitle,
        basePrice: selectedPackage.basePrice,
        otherPrices: selectedPackage.pricing,
      },
      customerSnapshot: bookingDetails,
      isDomestic: selectedPackage.domestic,
      departureDate,
      travellerCount: {
        adult: numAdults,
        kids: numChildren,
        infants: numToddler,
      },
      message: checkoutMessage,
      specialOccasion: {
        selected: specialOccasion.occasion !== "",
        date: specialOccasion.date,
        occasion: specialOccasion.occasion,
      },
      departureCity,
      isSingle,
    };

    if (isSingle) {
      setIsDialogOpen(true);
      return; // Early return here
    }


    try {
      const firebaseOrderId = await storeBookings(newBooking);
      const res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({ amount: grandTotal * 100 }),
      });
      const razorpayOrder = await res.json();
      if (!razorpayOrder?.id) throw new Error("Payment failed");

      // Update paymentStatus to initialized
      const docRef = doc(db, COLLECTIONS.BOOKINGS, firebaseOrderId);
      const updatedFirstoreData = await updateDoc(docRef, {
        paymentStatus: "Initialised",
      });

      // PAYMENT PART
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/verifyOrder", {
              method: "POST",
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            // Update paymentStatus to completed
            const docRef = doc(db, COLLECTIONS.BOOKINGS, firebaseOrderId);
            const updatedFirstoreData = await updateDoc(docRef, {
              paymentStatus: "Completed",
            });

            if (verifyData.isOk) {
              const firebasePayment = await storePayments({
                price: grandTotal,
                bookingId: firebaseOrderId,
                razorpayOrderId: razorpayOrder.id,
                razorpayPaymentId: verifyData.paymentId,
              });

              toast("Success", {
                description: "Your booking created.",
              });
            } else {
              const docRef = doc(db, COLLECTIONS.BOOKINGS, firebaseOrderId);
              const updatedFirstoreFailedData = await updateDoc(docRef, {
                paymentStatus: "Failed",
              });

              toast("Error", {
                description: "Payment failed. Try after sometime",
              });
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            const docRef = doc(db, COLLECTIONS.BOOKINGS, firebaseOrderId);
            const updatedFirstoreFailedData = await updateDoc(docRef, {
              paymentStatus: "Failed",
            });
            toast("Error", {
              description: "Payment failed. Try after sometime",
            });
          }
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Booking/Payment process error:", error);
    }
  };

  return (
    <section className="mb-20 pt-40">
      {/* Load Razorpay Script */}
      <script
        src="https://checkout.razorpay.com/v1/checkout.js"
        type="text/javascript"
        async
      />
      <Container>
        <div className="grid gap-8 c-lg:grid-cols-2 c-xxl:grid-cols-[2fr_1fr]">
          <div>
            <Button
              asChild
              className="mb-8 rounded-full border-2 border-solid border-[#999999] bg-transparent font-nord text-sm font-medium uppercase text-[#999999] shadow-none hover:border-neutral-700 hover:bg-neutral-700 hover:text-white"
            >
              <Link href="/">
                <ArrowLeft />
                <span>Back to website</span>
              </Link>
            </Button>

            <div className="mb-8 grid gap-x-5 gap-y-10 c-md:grid-cols-2 c-lg:grid-cols-1 c-xxl:grid-cols-2">
              <BookingDetails />
              <DepartureDate />
              <TravellerCount packageData={selectedPackage} />
              <CheckoutMessage />
              <SpecialOccasion />
            </div>
            <div className="flex items-end justify-between">
              <Button
                className="rounded-full px-6 py-5"
                variant="success"
                onClick={handleBooking}
              >
                Book Now
              </Button>
              <p className="text-sm">
                Confused or not sure,{" "}
                <Link
                  href="/contact"
                  className="border-b border-transparent font-semibold text-brand-blue transition-all duration-300 hover:border-brand-blue"
                >
                  Call Us
                </Link>
              </p>
            </div>
          </div>
          <div className="">
            <div className="sticky top-40">
              <div className="mb-8 overflow-hidden rounded-2xl bg-brand-blue">
                <CheckoutSummary
                  packageData={selectedPackage}
                  onGrandTotalChange={setGrandTotal}
                />
              </div>
              <p className="text-center text-xs">
                *Note: Additional beds will be charged extra.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <SingleCheckout
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        region={selectedPackage?.region}
        days={selectedPackage?.days}
      />
    </section>
  );
};

export default CheckoutPage;
