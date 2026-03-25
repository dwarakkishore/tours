import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCheckout } from "@/contexts/CheckoutContext";

const CheckoutMessage = () => {
  const { checkoutMessage, setCheckoutMessage } = useCheckout();

  return (
    <div className="">
      <Textarea
        onChange={(e) => setCheckoutMessage(e.target.value)}
        value={checkoutMessage}
        rows={10}
        placeholder="Anything you want to let us know..."
        className="h-full rounded-2xl border border-solid border-[#d9d9d9] p-4 pr-20 text-[#616161]"
      />
    </div>
  );
};

export default CheckoutMessage;
