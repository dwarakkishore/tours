"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A reusable modal for playing video reels.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {string} props.videoUrl - The URL of the video to play
 */
export default function VideoReelModal({ isOpen, onClose, videoUrl }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] !rounded-3xl bg-black p-0 overflow-hidden border-none shadow-2xl z-[100]">
        <DialogTitle className="sr-only">Video Reel</DialogTitle>
        <DialogDescription className="sr-only">
          Watch our curated travel highlights for this theme.
        </DialogDescription>
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {/* Close Button Overlay */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <X className="size-5" />
          </Button>

          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              controls
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-white p-12">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                <X className="w-8 h-8 opacity-20" />
              </div>
              <p className="font-medium opacity-60">The reel for this theme is currently being curated.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
