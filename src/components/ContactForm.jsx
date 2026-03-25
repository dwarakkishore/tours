"use client";
import { Button } from "./ui/button";
import useModal from "@/hooks/useModal";

export const ContactSection = () => {
  const { openModal } = useModal();

  return (
    <>
      <div className="hidden rounded bg-brand-blue p-8 c-xl:mt-6 c-xl:block">
        <div className="relative mb-8 inline-block border-b-2 border-solid border-brand-blue text-sm font-medium text-white">
          Get in touch
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold text-white">
            Not sure where to start?
          </h3>
          <p className="text-sm text-white">
            We are here to help you{" "}
            <span className="text-[#4dff4d]">guide</span> or even{" "}
            <span className="text-[#4dff4d]">curate a custom</span> package
            based on your liking
          </p>
        </div>

        <Button
          onClick={openModal}
          className=" rounded-xl bg-[#46b301] px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
        >
          Contact Us
        </Button>
      </div>
    </>
  );
};
