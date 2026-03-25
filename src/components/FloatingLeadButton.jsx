// "use client";
// import React from "react";
// import { MessageSquare } from "lucide-react";
// import { Button } from "./ui/button";
// import useModal from "@/hooks/useModal";

// const FloatingLeadButton = () => {
//   const { openModal, isOpen } = useModal();

//   return (
//     <>
//       {!isOpen && (
//         <Button
//           onClick={openModal}
//           className="fixed bottom-4 right-4 z-[49] flex aspect-square size-16 items-center justify-center rounded-[50%] bg-brand-blue p-0 hover:bg-brand-blue-hovered"
//         >
//           <MessageSquare className="!size-6" />
//         </Button>
//       )}
//     </>
//   );
// };

// export default FloatingLeadButton;

"use client";
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import useModal from "@/hooks/useModal";

const FloatingLeadButton = () => {
  const { openModal, isOpen } = useModal();

  if (isOpen) return null;

  return (
    <Button
      onClick={openModal}
      className="
        fixed bottom-4 right-4 z-[49]
        flex aspect-square size-16 items-center justify-center
        rounded-full bg-brand-blue p-0
        hover:bg-brand-blue-hovered
        float-base float-delay-2
      "
    >
      <MessageSquare className="!size-6" />
    </Button>
  );
};

export default FloatingLeadButton;
