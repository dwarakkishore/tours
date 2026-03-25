"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import { ArrowUpRight, Calendar, Tag, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// BlogCard Component for related posts
const RelatedBlogCard = ({ blog }) => {
  // Format date from Firebase timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };


  return (
    <article className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formatDate(blog.createdAt)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors tracking-tight leading-tight mb-6 line-clamp-2">
          {blog.title}
        </h3>
        
        <div className="mt-auto">
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-widest border-b-2 border-transparent hover:border-brand-blue pb-1 transition-all"
          >
            Read Article <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogPost = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metaKeywordTags, setMetaKeywordTags] = useState([]);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setLoading(true);


        // Fetch blog by slug
        const blogsRef = collection(db, COLLECTIONS.BLOGS);
        const blogQuery = query(
          blogsRef,
          where("slug", "==", params.blogId),
          where("status", "==", "published"),
          limit(1)
        );

        const blogSnapshot = await getDocs(blogQuery);

        if (blogSnapshot.empty) {
          setBlog(null);
          setLoading(false);
          return;
        }

        // Get the first (and should be only) document
        const blogDoc = blogSnapshot.docs[0];
        const blogData = { id: blogDoc.id, ...blogDoc.data() };
        setBlog(blogData);

        // Parse meta keywords
        if (
          blogData.metaKeywords &&
          typeof blogData.metaKeywords === "string"
        ) {
          // Parse the string into an array of tags
          const keywordTags = blogData.metaKeywords
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

          setMetaKeywordTags(keywordTags);
        } else {
          setMetaKeywordTags([]);
        }

        // If blog has categories, fetch related blogs with the same category
        if (blogData.categories && blogData.categories.length > 0) {
          const categoryId = blogData.categories[0];

          // Fetch related blogs (excluding current blog)
          const relatedQuery = query(
            blogsRef,
            where("status", "==", "published"),
            where("categories", "array-contains", categoryId),
            orderBy("createdAt", "desc"),
            limit(4)
          );

          const relatedSnapshot = await getDocs(relatedQuery);
          const related = [];

          relatedSnapshot.forEach((doc) => {
            const relatedData = { id: doc.id, ...doc.data() };
            // Don't include the current blog in related
            if (relatedData.id !== blogData.id) {
              related.push(relatedData);
            }
          });

          setRelatedBlogs(related.slice(0, 3)); // Limit to 3 related blogs
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [params.blogId]);

  // Format date from Firebase timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };


  if (loading) {
    return (
      <Container className="py-32 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-8 w-64 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-4 w-full max-w-md animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="mt-12 py-32 text-center">
        <h1 className="text-3xl font-bold text-brand-blue">
          Blog post not found
        </h1>
        <p className="mt-4">
          The blog post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild className="mt-8 rounded-full px-8 py-6">
          <Link href="/blogs">
            <ChevronLeft className="mr-2 size-4" />
            Back to Blogs
          </Link>
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] -mr-96 -mt-96" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-blue transition-all border border-white/10 group-hover:border-brand-blue">
                <ChevronLeft className="size-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to Blogs</span>
            </Link>
            
            <h1 className="text-3xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1] md:leading-[0.95] drop-shadow-2xl">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <Calendar className="size-5 text-brand-blue" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest">Published</span>
                  <span className="text-sm font-bold text-white">{formatDate(blog.createdAt)}</span>
                </div>
              </div>

              <div className="h-10 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30 backdrop-blur-sm">
                   <Tag className="size-5 text-brand-blue" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest">Category</span>
                  <span className="text-sm font-bold text-white">Travel Guide</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title, href: `/blogs/${blog.slug}`, active: true }
        ]} 
      />

      {/* Blog Content */}
      <section className="pt-8 pb-4 c-md:pt-12 c-md:pb-6">
        <Container>
          <div className="grid grid-cols-1 gap-8 c-lg:grid-cols-3">
            <div className="c-lg:col-span-2">
              {/* Featured Image */}
              <div className="mb-8 relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

               {/* Blog Content */}
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                  prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
                  prose-strong:font-bold prose-strong:text-slate-900
                  prose-li:text-slate-600 prose-li:font-medium
                  prose-img:rounded-[2rem] prose-img:border prose-img:border-slate-100"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags and Share */}
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="size-5 text-brand-blue" />
                  <span className="text-sm font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {/* ONLY render meta keyword tags here - completely replacing the previous code */}
                    {metaKeywordTags && metaKeywordTags.length > 0 ? (
                      <>
                        {metaKeywordTags.map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-[#E5ECF7] px-3 py-1 text-sm text-brand-blue"
                          >
                            {tag}
                          </span>
                        ))}
                      </>
                    ) : (
                      <span className="rounded-full bg-[#E5ECF7] px-3 py-1 text-sm text-brand-blue">
                        Blog
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Share2 className="size-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="c-lg:col-span-1">
              {/* Newsletter Signup - Modern Redesign */}
              <div className="sticky top-32">
                <div className="rounded-[2rem] bg-slate-900 p-8 text-white relative overflow-hidden group shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-blue/30 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                      <Share2 className="size-6 text-brand-blue" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">
                      Subscribe to <span className="text-brand-blue">Bayard News</span>
                    </h3>
                    <p className="mb-8 text-white/60 text-sm font-medium leading-relaxed">
                      Stay updated with the latest travel trends, exclusive deals, and expert guides delivered straight to your inbox.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-brand-blue/50 transition-all text-sm font-bold"
                        />
                      </div>
                      <Button className="w-full rounded-2xl py-7 bg-brand-blue hover:bg-brand-blue-light text-white font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-lg shadow-brand-blue/20">
                        Join Newsletter
                      </Button>
                    </div>
                    
                    <p className="mt-6 text-[10px] text-white/40 text-center font-bold uppercase tracking-tighter">
                      No spam, only pure inspiration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="pt-8 pb-16 bg-slate-50/50">
          <Container>
            <div className="mb-12">
              <h2 className="text-2xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                Related <span className="text-brand-blue">Articles</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-xl font-medium">Continue your discovery with more travel insights</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((blog) => (
                <RelatedBlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default BlogPost;
