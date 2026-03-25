"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Folder, Loader2 } from "lucide-react";
import { storage, db } from "@/firebase/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { COLLECTIONS } from "@/config";

export default function UserDocs({
  traveler,
  label,
  docType,
  userId,
  onDocumentUpdate,
}) {
  const [uploading, setUploading] = useState(false);
  const userDocument = traveler.documents[docType];
  const isUploaded = userDocument?.status === "uploaded";

  const handleUpload = async () => {
    setUploading(true);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf,image/*";

    // Create a promise that resolves when focus returns to window
    const dialogClosedPromise = new Promise((resolve) => {
      const handleFocus = () => {
        // Wait a tiny bit to let the file input update
        setTimeout(() => {
          window.removeEventListener("focus", handleFocus);
          resolve(fileInput.files[0]);
        }, 100);
      };
      window.addEventListener("focus", handleFocus);
    });

    fileInput.click();
    const file = await dialogClosedPromise;

    if (!file) {
      setUploading(false);
      return;
    }

    const toastId = toast.loading(`Uploading ${label}...`);

    try {
      // Determine the storage path based on whether it's a companion or user
      const storagePath = traveler.id
        ? `users/${userId}/travelCompanions/${traveler.id}/documents/${docType}/${file.name}`
        : `users/${userId}/documents/${docType}/${file.name}`;

      // Create a reference to the file in Firebase Storage
      const fileRef = storageRef(storage, storagePath);

      // Upload the file
      await uploadBytes(fileRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(fileRef);

      // Update Firestore
      if (traveler.id) {
        // Update companion document
        const companionRef = doc(
          db,
          COLLECTIONS.USERS,
          userId,
          "travelCompanions",
          traveler.id
        );
        const userRef = doc(db, COLLECTIONS.USERS, userId);

        const documentUpdate = {
          status: "uploaded",
          fileName: file.name,
          uploadedAt: new Date().toISOString(),
          url: downloadURL,
        };

        // Update both companion and user documents
        await Promise.all([
          updateDoc(companionRef, {
            [`documents.${docType}`]: documentUpdate,
            updated_at: new Date().toISOString(),
          }),
          updateDoc(userRef, {
            [`travelCompanions.${traveler.id}.documents.${docType}`]:
              documentUpdate,
            updated_at: new Date().toISOString(),
          }),
        ]);
      } else {
        // Update user document (existing code)
        const userRef = doc(db, COLLECTIONS.USERS, userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          await updateDoc(userRef, {
            [`documents.${docType}`]: {
              status: "uploaded",
              fileName: file.name,
              uploadedAt: new Date().toISOString(),
              url: downloadURL,
            },
            updated_at: new Date().toISOString(),
          });
        } else {
          await setDoc(userRef, {
            documents: {
              [docType]: {
                status: "uploaded",
                fileName: file.name,
                uploadedAt: new Date().toISOString(),
                url: downloadURL,
              },
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }

      // Notify parent component to refresh data
      if (onDocumentUpdate) {
        onDocumentUpdate();
      }

      toast.success(`${label} uploaded successfully`, {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to upload document. Please try again.", {
        id: toastId,
      });
    } finally {
      setUploading(false);
    }
  };

  const viewDocument = () => {
    if (userDocument?.url) {
      window.open(userDocument.url, "_blank");
    } else {
      toast.error("Document URL not found");
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-xs uppercase text-muted-foreground">
          ({userDocument?.status || "not_uploaded"})
        </span>
      </div>
      {isUploaded ? (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 border border-solid border-brand-blue text-muted-foreground hover:text-brand-blue disabled:opacity-50"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Pencil className="size-4 text-brand-blue" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="group size-8 border border-solid bg-brand-blue text-white hover:bg-white disabled:opacity-50"
            onClick={viewDocument}
            disabled={uploading}
          >
            <Folder className="size-4 fill-white group-hover:fill-brand-blue" />
          </Button>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2 rounded-full border border-solid border-brand-blue bg-brand-blue px-4 py-2 text-white hover:bg-white hover:text-brand-blue-hovered disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading && <Loader2 className="size-4 animate-spin" />}
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      )}
    </div>
  );
}
