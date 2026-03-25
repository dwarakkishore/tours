"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, listAll, deleteObject } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig";
import { useState } from "react";

export default function RemoveCompanionDialog({ companion, userId, onRemove }) {
  const [open, setOpen] = useState(false);

  const handleRemoveCompanion = async () => {
    if (!userId || !companion.id) return;

    const toastId = toast.loading("Removing travel companion...");

    try {
      // Delete all documents from storage
      const companionStorageRef = storageRef(
        storage,
        `users/${userId}/travelCompanions/${companion.id}`
      );

      try {
        // List all files in the companion's directory
        const filesList = await listAll(companionStorageRef);

        // Delete each file
        const deletionPromises = filesList.items.map((fileRef) =>
          deleteObject(fileRef)
        );

        await Promise.all(deletionPromises);
      } catch (error) {
        // If directory doesn't exist or other storage errors, continue with Firestore deletion
      }

      // Delete the companion document from Firestore
      const companionRef = doc(
        db,
        "users",
        userId,
        "travelCompanions",
        companion.id
      );

      await deleteDoc(companionRef);

      // Close dialog and notify parent
      setOpen(false);
      if (onRemove) {
        await onRemove();
      }

      toast.success("Travel companion removed successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to remove travel companion", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Travel Companion</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {companion.name}? This action cannot
            be undone and all associated documents will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleRemoveCompanion}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
