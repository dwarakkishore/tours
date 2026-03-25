"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import useModal from "@/hooks/useModal";
import dynamic from "next/dynamic";

import ConfirmationDialog from "./ConfirmationDialog";
import useToggleState from "@/hooks/useToggleState";
import EnquiryFormFields from "./EnquiryFormFields";

function LeadFormComponent() {
  const { isOpen, closeModal, region } = useModal();
  const confirmationDialogControls = useToggleState();

  const closeAllModals = () => {
    confirmationDialogControls.close();
    closeModal();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAllModals}>
      <AlertDialogContent className="flex flex-col h-auto max-h-[calc(100dvh-40px)] w-[calc(100vw-40px)] max-w-[500px] !rounded-3xl bg-[#F8F8F8] p-0 overflow-hidden">
        <AlertDialogHeader className="shrink-0">
          <div className="flex items-center justify-between pt-4">
            <AlertDialogTitle className="text-left text-lg font-medium text-brand-blue c-md:text-2xl px-8 uppercase tracking-widest">
              Get in touch
            </AlertDialogTitle>
            <span className="flex items-center justify-center">
              <AlertDialogCancel type="button" onClick={closeAllModals}>
                <X className="!size-5 text-brand-blue c-md:!size-7" />
              </AlertDialogCancel>
            </span>
          </div>
        </AlertDialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-0 bg-[#F8F8F8]">
          <ConfirmationDialog
            controls={confirmationDialogControls}
            closeModal={closeAllModals}
          />
          <EnquiryFormFields 
            variant="modal"
            hideFields={["departureDate", "numTravellers", "destination", "departureCity", "numDays"]}
            initialData={{ destination: region }} 
            onSuccess={() => confirmationDialogControls.open()} 
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Wrap the component with dynamic import
const LeadForm = dynamic(() => Promise.resolve(LeadFormComponent), {
  ssr: false,
});

export default LeadForm;
