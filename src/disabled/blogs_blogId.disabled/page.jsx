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

// BlogCard Component for related posts
const RelatedBlogCard = ({ blog, allCategories = [] }) => {
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

  // Find the category name based on category ID
  const getCategoryName = () => {
    if (!blog.categories || blog.categories.length === 0)
      return "Uncategorized";

    const categoryId = blog.categories[0];
    const category = allCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <article className="sm:hoverable-card overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative h-[180px] overflow-hidden">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          width={400}
          height={180}
          className="size-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-md bg-brand-blue px-3 py-1 text-xs font-medium text-white">
          {getCategoryName()}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <h3 className="mb-3 line-clamp-2 text-base font-bold text-brand-blue">
          {blog.title}
        </h3>
        <Link
          href={`/blogs/${blog.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-brand-blue"
        >
          Read more <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
};

const BlogPost = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metaKeywordTags, setMetaKeywordTags] = useState([]);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setLoading(true);

        // Fetch categories first
        const categoriesSnapshot = await getDocs(
          collection(db, COLLECTIONS.BLOG_CATEGORIES)
        );
        const categories = [];
        categoriesSnapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() });
        });
        setBlogCategories(categories);

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

        // Parse meta keywords - explicitly log and process this
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

  // Find the category name based on category ID
  const getCategoryName = () => {
    if (!blog || !blog.categories || blog.categories.length === 0)
      return "Uncategorized";

    const categoryId = blog.categories[0];
    const category = blogCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
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
      <section className="relative bg-brand-blue py-24">
        <div className="pattern-bg absolute inset-0 z-10 opacity-5"></div>
        <Container>
          <div className="relative z-10">
            <Link
              href="/blogs"
              className="mb-6 inline-flex items-center gap-2 text-white hover:underline"
            >
              <ChevronLeft className="size-4" />
              Back to Blogs
            </Link>
            <div className="max-w-3xl">
              <div className="mb-4">
                <span className="rounded-md bg-white px-3 py-1 text-sm font-medium text-brand-blue">
                  {getCategoryName()}
                </span>
              </div>
              <h1 className="mb-6 font-nord text-4xl font-bold text-white c-md:text-5xl">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Content */}
      <section className="py-12 c-md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 c-lg:grid-cols-3">
            <div className="c-lg:col-span-2">
              {/* Featured Image */}
              <div className="mb-8 overflow-hidden rounded-2xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={900}
                  height={500}
                  className="size-full object-cover"
                />
              </div>

              {/* Blog Content */}
              <div
                className="prose prose-lg max-w-none"
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
              {/* Newsletter Signup */}
              <div className="mb-8 rounded-2xl bg-brand-blue p-6 text-white">
                <h3 className="mb-3 font-nord text-xl font-bold">
                  Subscribe to Our Newsletter
                </h3>
                <p className="mb-4 text-sm">
                  Get travel tips and exclusive offers delivered to your inbox.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-full px-4 py-2 text-gray-800 outline-none"
                  />
                  <Button variant="success" className="rounded-full">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold text-brand-blue">
                  Popular Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blogs/categories/${category.slug}`}
                      className="rounded-full bg-[#E5ECF7] px-3 py-1 text-sm text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="section-padding bg-[#F1F5FC]">
          <Container>
            <h2 className="section-header-margin items-center gap-8 text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#798290] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#798290] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
              <div className="text-center font-nord">
                <span className="text-4xl font-light text-[#798290]">
                  Related
                </span>{" "}
                <span className="text-4xl font-bold">articles</span>
              </div>
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 c-md:grid-cols-2 c-lg:grid-cols-3">
              {relatedBlogs.map((blog) => (
                <RelatedBlogCard
                  key={blog.id}
                  blog={blog}
                  allCategories={blogCategories}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default BlogPost;
