"use client";

import { AlertCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchData } from "@/utils/api-utils";
import type { Category } from "@/utils/types";

interface CategoryLinksProps {
  onCategoryClick?: () => void;
}

// Enhanced loading skeleton component
function CategorySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse mb-3 shadow-sm" />
          <div className="h-2.5 w-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// Enhanced error state component
function CategoryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-gray-900 font-semibold text-lg mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-500 text-sm mb-6 text-center">
        We couldn't load the categories right now
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-gradient-to-r from-primaryColor to-primaryColor/90 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  );
}

// Enhanced empty state component
function EmptyCategories() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-gray-900 font-semibold text-lg mb-2">
        No categories yet
      </h3>
      <p className="text-gray-500 text-sm">
        Categories will appear here when they're available
      </p>
    </div>
  );
}

function CategoryItem({
  category,
  onClick,
}: {
  category: Category;
  onClick?: () => void;
}) {
  return (
    <Link
      href={`/categories/${category.slug || category.id}`}
      className="group flex flex-col items-center p-3 rounded-2xl bg-white border  border-primaryColor/20 hover:shadow-lg hover:shadow-primaryColor/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor/30 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="w-14 h-14 relative rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {category.attachment?.url ? (
          <Image
            src={category.attachment.url || "/placeholder.svg"}
            alt={`${category.name} category`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primaryColor/10 to-primaryColor/20 flex items-center justify-center">
            <span className="text-primaryColor text-lg font-bold">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-gray-900  h-6 font-medium text-xs text-center leading-tight group-hover:text-primaryColor transition-colors duration-200">
        {category.name}
      </h3>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
}

export function CategoryLinks({ onCategoryClick }: CategoryLinksProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(false);
      const data: Category[] = await fetchData(
        "categories?isMainCategory=true"
      );
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 font-bold text-xl">Categories</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primaryColor to-primaryColor/50 rounded-full" />
        </div>
        <CategorySkeleton />
      </div>
    );
  }

  if (error) {
    return <CategoryError onRetry={loadCategories} />;
  }

  if (!categories.length) {
    return <EmptyCategories />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 font-bold text-xl">Categories</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">
            {categories.length} available
          </span>
          <div className="h-1 w-8 bg-gradient-to-r from-primaryColor to-primaryColor/50 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 50}ms`,
              animationDuration: "300ms",
              animationFillMode: "both",
            }}
          >
            <CategoryItem category={category} onClick={onCategoryClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
