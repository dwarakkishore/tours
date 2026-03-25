"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { trackSubmitLeadForm } from "@/utils/conversion";

const ConfirmationDialog = ({ controls, closeModal }) => {
  const { state } = controls;

  useEffect(() => {
    if (state) {
      // Trigger Google Ads conversion event
      trackSubmitLeadForm();

      const timer = setTimeout(() => {
        closeModal();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <Dialog open={state} onOpenChange={closeModal}>
      <DialogContent
        closeButton={false}
        className="max-w-xl bg-white p-10 text-center sm:rounded-3xl"
      >
        <VisuallyHidden>
          <DialogTitle>Thank you for your enquiry!</DialogTitle>
        </VisuallyHidden>
        <button
          onClick={closeModal}
          className="absolute right-6 top-6 text-green-500 hover:text-green-600"
          aria-label="Close"
        >
          <X className="size-6" />
        </button>

        <div className="flex justify-center">
          <div className="rounded-full">
            <svg
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_4862_218"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="41"
                height="40"
              >
                <rect x="0.121094" width="40" height="40" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_4862_218)">
                <path
                  d="M35.6772 13.555C36.3994 13.555 37.043 13.8375 37.608 14.4025C38.1727 14.9672 38.4551 15.6107 38.4551 16.3329V19.7216C38.4551 19.9902 38.4249 20.2958 38.3647 20.6383C38.3047 20.9811 38.2144 21.2866 38.0938 21.555L33.2051 32.9162C32.9551 33.4904 32.543 33.9811 31.9688 34.3883C31.3949 34.7958 30.7886 34.9995 30.1497 34.9995H14.3992C13.6309 34.9995 12.9759 34.7287 12.4342 34.187C11.8926 33.6454 11.6217 32.9902 11.6217 32.2216V14.68C11.6217 14.3283 11.6936 13.9834 11.8372 13.6454C11.9805 13.3073 12.1772 13.0133 12.4272 12.7633L21.1909 3.70788C21.5892 3.31899 22.0638 3.08288 22.6147 2.99955C23.1655 2.91622 23.6863 3.01344 24.1772 3.29122C24.668 3.56899 25.0315 3.95788 25.2676 4.45788C25.5037 4.95788 25.5615 5.47177 25.4409 5.99955L23.7605 13.555H35.6772ZM6.14966 34.9995C5.41799 34.9995 4.78605 34.7333 4.25383 34.2008C3.72133 33.6686 3.45508 33.0366 3.45508 32.305V16.2495C3.45508 15.5182 3.72133 14.8862 4.25383 14.3537C4.78605 13.8212 5.41799 13.555 6.14966 13.555C6.88105 13.555 7.51299 13.8212 8.0455 14.3537C8.57772 14.8862 8.84383 15.5182 8.84383 16.2495V32.305C8.84383 33.0366 8.57772 33.6686 8.0455 34.2008C7.51299 34.7333 6.88105 34.9995 6.14966 34.9995Z"
                  fill="#46B301"
                />
              </g>
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-brand-blue">
          THANK YOU FOR YOUR ENQUIRY!
        </h2>

        <p className="pb-12 font-sans text-[#62748E]">
          Our travel experts will get back to you shortly to help you plan your
          dream vacation. Keep an eye on your phone and email!
        </p>
        <div className="absolute inset-x-10 bottom-8 flex h-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-1/2 origin-right animate-[progressBarLeft_5s_linear_forwards] rounded-l-full bg-brand-blue" />
          <div className="h-full w-1/2 origin-left animate-[progressBarRight_5s_linear_forwards] rounded-r-full bg-brand-blue" />
        </div>
        <style jsx>{`
          @keyframes progressBarLeft {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }
          @keyframes progressBarRight {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
