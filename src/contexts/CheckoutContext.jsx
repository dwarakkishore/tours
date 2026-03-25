"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CheckoutContext = createContext();

const removeFirstThree = (str) => {
  if (!str || typeof str !== "string") {
    return "";
  }
  return str.length > 3 ? str.slice(3) : "";
};

export const CheckoutProvider = ({ children }) => {
  const user = useAuth();

  const [selectedPackage, setSelectedPackages] = useState(null);
  const [departureCity, setDepartureCity] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    fullname: "",
    contact: "",
    email: "",
  });
  const [departureDate, setDepartureDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    return nextWeek;
  });
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numToddler, setNumToddler] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [specialOccasion, setSpecialOccasion] = useState({
    date: null,
    occasion: "",
  });

  useEffect(() => {
    setBookingDetails({
      fullname: user?.user?.displayName || "",
      contact: removeFirstThree(user?.user?.phoneNumber) || "",
      email: user?.user?.email || "",
    });
  }, [setBookingDetails, user]);

  return (
    <CheckoutContext.Provider
      value={{
        selectedPackage,
        numAdults,
        numChildren,
        numToddler,
        bookingDetails,
        departureDate,
        checkoutMessage,
        specialOccasion,
        departureCity,
        setDepartureCity,
        setSelectedPackages,
        setNumAdults,
        setNumChildren,
        setNumToddler,
        setBookingDetails,
        setDepartureDate,
        setCheckoutMessage,
        setSpecialOccasion,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a Checkout Provider");
  }
  return context;
};
