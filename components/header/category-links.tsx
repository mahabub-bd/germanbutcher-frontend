"use client";

import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchData } from "@/utils/api-utils";
import type { Category } from "@/utils/types";

interface CategoryLinksProps {
  onCategoryClick?: () => void;
}

// Loading skeleton component
function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-3 rounded-lg bg-white/10"
        >
          <div className="w-16 h-16 bg-gray-300/50 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-20 bg-gray-300/50 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// Error state component
function CategoryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-white">
      <AlertCircle className="w-12 h-12 mb-4 text-white/70" />
      <p className="text-center mb-4">Failed to load categories</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

// Empty state component
function EmptyCategories() {
  return (
    <div className="text-center text-white py-8">
      <p>No categories available</p>
    </div>
  );
}

// Individual category item component
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
      className="group flex flex-col items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
      onClick={onClick}
    >
      <div className="w-16 h-16 relative bg-white rounded-lg overflow-hidden mb-2 border border-gray-200">
        {category.attachment?.url ? (
          <Image
            src={category.attachment.url || "/placeholder.svg"}
            alt={`${category.name} category`}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-white font-medium text-sm text-center leading-tight group-hover:text-white/90 transition-colors">
        {category.name}
      </h3>
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
    return <CategorySkeleton />;
  }

  if (error) {
    return <CategoryError onRetry={loadCategories} />;
  }

  if (!categories.length) {
    return <EmptyCategories />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-white font-semibold text-lg">Categories</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}
