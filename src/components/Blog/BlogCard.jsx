import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";
import { normalizeImageUrl } from "@/lib/utils";

const BlogCard = ({ blog }) => {
  // Simple date formatter if it's a string
  const dateString = blog.date || "Just now";
  
  return (
    <article className="group h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={normalizeImageUrl(blog.image || blog.featuredImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80")}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-blue/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            {blog.category || "Travel"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-3 uppercase tracking-widest font-semibold">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {dateString}
          </span>
          {blog.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {blog.readTime}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {blog.excerpt || blog.metaDescription || "Discover breathtaking destinations and expert travel tips in our latest blog post."}
        </p>

        <Link
          href={`/blogs/${blog.slug || blog.id || ""}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-blue-hovered transition-colors group/link"
        >
          Read Full Story
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
