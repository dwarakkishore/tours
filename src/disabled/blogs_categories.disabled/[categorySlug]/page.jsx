"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { COLLECTIONS } from "@/config";

// Blog Card Component
const BlogCard = ({ blog, categories = [] }) => {
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
    // If no categories field or empty, return Uncategorized
    if (!blog.categories || blog.categories.length === 0)
      return "Uncategorized";

    // Get the first category ID (assuming we display the primary category)
    const categoryId = blog.categories[0];

    // Find matching category by ID
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <article className="sm:hoverable-card h-full overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative h-[240px] overflow-hidden">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          width={400}
          height={240}
          className="size-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-md bg-brand-blue px-3 py-1 text-xs font-medium text-white">
          {getCategoryName()}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-brand-blue">
          {blog.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {blog.metaDescription || "Explore this article to learn more..."}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 overflow-hidden rounded-full bg-gray-200">
              {/* Placeholder for author image */}
            </div>
            <span className="text-xs font-medium">Admin</span>
          </div>
          <Link
            href={`/blogs/${blog.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-brand-blue"
          >
            Read more <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.categorySlug;

  const [category, setCategory] = useState(null);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [otherCategories, setOtherCategories] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndBlogs = async () => {
      try {
        setLoading(true);

        // Find the category by slug
        const categoryQuery = query(
          collection(db, COLLECTIONS.BLOG_CATEGORIES),
          where("slug", "==", categorySlug)
        );

        const categorySnapshot = await getDocs(categoryQuery);

        if (categorySnapshot.empty) {
          setCategory(null);
          setLoading(false);
          return;
        }

        // Get the category data
        const categoryDoc = categorySnapshot.docs[0];
        const categoryData = { id: categoryDoc.id, ...categoryDoc.data() };
        setCategory(categoryData);

        // Get all categories for display
        const allCategoriesQuery = query(
          collection(db, COLLECTIONS.BLOG_CATEGORIES)
        );
        const allCategoriesSnapshot = await getDocs(allCategoriesQuery);

        const categories = [];
        allCategoriesSnapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() });
        });

        // Filter out the current category for "Other Categories" section
        const others = categories.filter((cat) => cat.id !== categoryData.id);
        setOtherCategories(others);

        // Get blogs for this category
        const blogsQuery = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published"),
          where("categories", "array-contains", categoryData.id),
          orderBy("createdAt", "desc")
        );

        const blogsSnapshot = await getDocs(blogsQuery);

        const blogs = [];
        blogsSnapshot.forEach((doc) => {
          blogs.push({ id: doc.id, ...doc.data() });
        });

        setCategoryBlogs(blogs);

        // Get all blogs for category counts
        const allBlogsQuery = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published")
        );

        const allBlogsSnapshot = await getDocs(allBlogsQuery);

        const allBlogsData = [];
        allBlogsSnapshot.forEach((doc) => {
          allBlogsData.push({ id: doc.id, ...doc.data() });
        });

        setAllBlogs(allBlogsData);
      } catch (error) {
        // Fallback to client-side filtering if index error
        if (error.code === "failed-precondition") {
          fetchAllBlogsAndFilter();
        }
      } finally {
        setLoading(false);
      }
    };

    // Fallback function for client-side filtering
    const fetchAllBlogsAndFilter = async () => {
      try {
        // Get all categories
        const categoriesQuery = query(
          collection(db, COLLECTIONS.BLOG_CATEGORIES)
        );
        const categoriesSnapshot = await getDocs(categoriesQuery);

        const categories = [];
        categoriesSnapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() });
        });

        // Find current category
        const currentCategory = categories.find(
          (cat) => cat.slug === categorySlug
        );

        if (!currentCategory) {
          setCategory(null);
          setLoading(false);
          return;
        }

        setCategory(currentCategory);

        // Filter other categories
        const others = categories.filter(
          (cat) => cat.id !== currentCategory.id
        );
        setOtherCategories(others);

        // Get all published blogs
        const blogsQuery = query(
          collection(db, COLLECTIONS.BLOGS),
          where("status", "==", "published")
        );

        const blogsSnapshot = await getDocs(blogsQuery);

        const allBlogsData = [];
        blogsSnapshot.forEach((doc) => {
          allBlogsData.push({ id: doc.id, ...doc.data() });
        });

        setAllBlogs(allBlogsData);

        // Client-side filter for blogs in this category
        const filteredBlogs = allBlogsData.filter(
          (blog) =>
            blog.categories &&
            Array.isArray(blog.categories) &&
            blog.categories.includes(currentCategory.id)
        );

        // Sort by createdAt
        filteredBlogs.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB - dateA; // Newest first
        });

        setCategoryBlogs(filteredBlogs);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndBlogs();
  }, [categorySlug]);

  // Count blogs in a category
  const getCategoryCount = (categoryId) => {
    return allBlogs.filter(
      (blog) =>
        blog.categories &&
        Array.isArray(blog.categories) &&
        blog.categories.includes(categoryId)
    ).length;
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

  if (!category) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-3xl font-bold text-brand-blue">
          Category not found
        </h1>
        <p className="mt-4">
          The category you&apos;re looking for doesn&apos;t exist or has been
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
      <section className="relative bg-brand-blue py-16">
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
              <h1 className="mb-6 font-nord text-4xl font-bold text-white c-md:text-5xl">
                {category.name}
              </h1>
              <p className="text-lg text-white/80">
                Explore our collection of {categoryBlogs.length} articles about{" "}
                {category.name.toLowerCase()}.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Blog Listing */}
      <section className="section-padding">
        <Container>
          {categoryBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 c-md:grid-cols-2 c-lg:grid-cols-3">
              {categoryBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  categories={[category, ...otherCategories]}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-brand-blue">
                No Articles Found
              </h2>
              <p className="text-gray-600">
                We couldn&apos;t find any articles in this category. Check back
                later for new content.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Other Categories */}
      <section className="section-padding bg-[#F1F5FC]">
        <Container>
          <h2 className="section-header-margin items-center gap-8 text-2xl uppercase !leading-[150%] text-brand-blue before:hidden before:h-px before:w-10 before:flex-1 before:bg-[#798290] before:content-[''] after:hidden after:h-px after:w-10 after:flex-1 after:bg-[#798290] after:content-[''] c-md:flex c-md:before:inline-block c-md:after:inline-block c-lg:text-4xl c-lg:!leading-[130%]">
            <div className="text-center font-nord">
              <span className="text-4xl font-light text-[#798290]">
                Explore
              </span>{" "}
              <span className="text-4xl font-bold">other categories</span>
            </div>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 c-md:grid-cols-2 c-lg:grid-cols-3">
            {otherCategories.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                href={`/blogs/categories/${cat.slug}`}
                className="sm:hoverable-card flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:bg-[#E5ECF7]"
              >
                <div>
                  <h3 className="text-xl font-bold text-brand-blue">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {/* Display number of articles in each category */}
                    {getCategoryCount(cat.id)} articles
                  </p>
                </div>
                <ArrowUpRight className="size-5 text-brand-blue" />
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6"
            >
              <Link href="/blogs">View All Categories</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CategoryPage;
