"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video, Image as ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";

// Authentic client videos
const CLIENT_VIDEOS = [];

const VideoCard = ({ video, index, onClick }) => {
  return (
    <motion.div
      onClick={() => onClick(video)}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <video
        src={video}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        playsInline
        muted
        loop
        onMouseOver={(e) => e.target.play()}
        onMouseOut={(e) => {
          e.target.pause();
          e.target.currentTime = 0;
        }}
      />
      
      {/* Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Video className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video</span>
        </div>
      </div>

      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
        <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
           <Play className="w-6 h-6 text-white fill-current ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default function ReviewGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("Videos Only");

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
           <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
             Customer <span className="text-blue-600">Reviews</span>
           </h2>
           <p className="text-slate-500 text-lg font-medium">
             See what our customers are sharing about their experience
           </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12">
            {["All Media", "Images Only", "Videos Only"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                        activeTab === tab 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                {activeTab !== "Images Only" ? (
                    CLIENT_VIDEOS.map((video, index) => (
                        <VideoCard 
                            key={index} 
                            video={video} 
                            index={index} 
                            onClick={setSelectedVideo}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon className="w-10 h-10 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-bold">No images available yet</p>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/95 backdrop-blur-xl p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <div 
                className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                  <button
                    className="absolute top-6 right-6 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-md border border-white/10"
                    onClick={() => setSelectedVideo(null)}
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <video
                    src={selectedVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    playsInline
                  />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
