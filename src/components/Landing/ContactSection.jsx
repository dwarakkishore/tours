import { useState } from "react";
import Container from "@/components/ui/Container";
import EnquiryFormFields from "@/components/Forms/EnquiryForm/EnquiryFormFields";
import ConfirmationDialog from "@/components/Forms/EnquiryForm/ConfirmationDialog";
import useToggleState from "@/hooks/useToggleState";

const ContactSection = () => {
  const confirmationDialogControls = useToggleState();

  return (
    <section className="relative overflow-hidden bg-slate-50/30 py-24 lg:py-32">
      <ConfirmationDialog 
        controls={confirmationDialogControls}
        closeModal={() => confirmationDialogControls.close()}
      />
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3">
              Let's Plan Your
              <span className="block text-brand-blue font-bold">
                Dream Vacation
              </span>
            </h2>
            <p className="text-base text-slate-500 font-normal">
              Share your details and we'll create the perfect journey for you
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100">
            <EnquiryFormFields 
              formType="potential"
              variant="section"
              hideFields={["destination"]}
              onSuccess={() => confirmationDialogControls.open()}
            />
          </div>

          {/* Contact Info */}
          <div className="mt-10 text-center">
            <p className="text-xs text-slate-400 mb-3">Or reach us directly</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a 
                href="tel:+918069365050" 
                className="flex items-center gap-1.5 text-brand-blue font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 80693 65050
              </a>
              <span className="text-slate-200">•</span>
              <a 
                href="mailto:contact@bayardvacations.com" 
                className="flex items-center gap-1.5 text-brand-blue font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@bayardvacations.com
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
