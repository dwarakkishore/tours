"use client";
import { useState, useEffect } from "react";
import { Star, MapPin, Quote, Filter, ChevronDown, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReviewGallery from "@/components/Reviews/ReviewGallery";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fallbackReviews = [
    {
      id: 1,
      author_name: "Sarah Mitchell",
      location: "Global Traveler",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      text: "Our trip with Bayard Vacations was absolutely flawless. The itinerary was perfectly balanced between culture and adventure. The team went above and beyond to ensure every detail was perfect.",
      relative_time_description: "2 months ago",
      rating: 5,
      type: "Cultural Tour"
    },
    {
      id: 2,
      author_name: "James Wilson",
      location: "Adventure Enthusiast",
      avatar: "https://i.pravatar.cc/150?u=james",
      text: "Bayard Vacations truly understands luxury travel. Every detail was handled with precision and care. The hotel selections were top-notch and the local guides were incredibly knowledgeable.",
      relative_time_description: "5 months ago",
      rating: 5,
      type: "Luxury Escape"
    },
    {
      id: 3,
      author_name: "Elena Rodriguez",
      location: "Culture Seeker",
      avatar: "https://i.pravatar.cc/150?u=elena",
      text: "Our getaway took our breath away. Every moment felt like stepping into a storybook! The hospitality and attention to detail is something I'll never forget.",
      relative_time_description: "1 year ago",
      rating: 5,
      type: "Heritage Tour"
    },
    {
      id: 4,
      author_name: "David Chen",
      location: "Nature Lover",
      avatar: "https://i.pravatar.cc/150?u=david",
      text: "Professional service from start to finish. The booking process was simple, and the support teammate was always available. The stunning views were the highlight of my trip.",
      relative_time_description: "1 year ago",
      rating: 5,
      type: "Nature Adventure"
    }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        
        if (data.success && data.reviews.length > 0) {
          const mappedReviews = data.reviews.map((review, idx) => ({
            id: review.id || `verified-${idx}`,
            author_name: review.author || "Guest Traveler",
            location: review.location || "Verified Traveler", // Fallback as API might not have this
            avatar: review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author || "Guest")}&background=random`,
            text: review.text,
            relative_time_description: review.relative_time_description,
            rating: review.rating || 5,
            type: review.type || "Verified Review" // Fallback
          }));
          setReviews(mappedReviews);
        } else {
          setReviews(fallbackReviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews(fallbackReviews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guest Stories", href: "/reviews", active: true },
            ]}
          />
        </div>

        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            Guest <span className="text-blue-600">Stories</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl">
            Read authentic experiences from travelers who explored the wonders of the world with Bayard Vacations.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Overall Rating", value: "4.9/5", detail: "Based on 1,200+ reviews" },
            { label: "Happy Travelers", value: "25,000+", detail: "Across 45+ countries" },
            { label: "Repeat Customers", value: "94%", detail: "High satisfaction rate" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
               <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
               <div className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</div>
               <p className="text-slate-500 text-xs font-medium mt-1">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Filters/Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto">
             {["All Reviews", "Latest", "Top Rated"].map((opt) => (
                <button 
                  key={opt}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${opt === "All Reviews" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  {opt}
                </button>
             ))}
          </div>
          <div className="relative w-full md:w-64">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search reviews..." 
               className="w-full bg-white border border-slate-100 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
             />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center">
               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Stories...</p>
            </div>
          ) : (
            reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-50 flex flex-col group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-blue-500 transition-colors duration-500">
                       <Image src={review.avatar} alt={review.author_name} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-lg tracking-tight leading-none mb-1">{review.author_name}</h4>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                        <MapPin className="w-3 h-3" /> {review.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-50/50 -z-10 group-hover:text-blue-100/50 transition-colors duration-500" />
                  <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                   <span className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold uppercase text-slate-500 tracking-widest">{review.type}</span>
                   <span className="text-slate-400 text-xs font-bold">{review.relative_time_description}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Client Gallery */}
        <div className="mt-20">
          <ReviewGallery />
        </div>


      </Container>
    </main>
  );
}
