import { fetchData } from "@/utils/api-utils";
import { Category } from "@/utils/types";
import { Suspense } from "react";
import CategoryCard from "./category-card";

// Loading skeleton for categories
function CategoryCardSkeleton() {
  return (
    <div className="group block rounded-lg overflow-hidden animate-pulse">
      <div className="flex w-full items-center justify-center">
        <div className="relative md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-full p-2 flex items-center justify-center border-2 border-dashed border-gray-200">
          <div className="w-full h-full rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="p-2 text-center">
        <div className="h-6 bg-gray-200 rounded mx-auto w-3/4" />
      </div>
    </div>
  );
}

// Grid skeleton
function CategoryGridSkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-5 sm:gap-4 md:gap-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Type for attachment API response
interface AttachmentData {
  id: number;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string;
  gallery: null;
}

async function getFlashSaleCategory(): Promise<Category | null> {
  try {
    const attachmentData = await fetchData<AttachmentData>("attachment/1011");

    return {
      id: 2500,
      name: "Flash Sale",
      slug: "special-offers",
      parentId: null,
      order: 0,
      description: "Special offers and flash sale products",
      isMainCategory: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachment: {
        id: attachmentData?.id,
        url: attachmentData?.url,
        fileName: attachmentData?.fileName,
        originalName: attachmentData?.originalName,
        mimeType: attachmentData?.mimeType,
        key: attachmentData?.key,
        size: attachmentData?.size,
        createdAt: attachmentData?.createdAt,
        updatedAt: attachmentData?.updatedAt,
      },
    } as Category;
  } catch (error) {
    // Fallback if API fails
    console.error("Failed to fetch flash sale attachment:", error);
    return null;
  }
}

async function CategoryGrid({ endpoint }: { endpoint: string }) {
  const [categories, flashSaleCategory] = await Promise.all([
    fetchData<Category[]>(endpoint),
    getFlashSaleCategory(),
  ]);

  if (!categories?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No categories found</p>
      </div>
    );
  }

  const allCategories = flashSaleCategory
    ? [flashSaleCategory, ...categories]
    : categories;

  return (
    <div className="container mx-auto grid grid-cols-4 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
      {allCategories.map((category: Category) => (
        <CategoryCard key={category?.id} category={category} />
      ))}
    </div>
  );
}

interface CategoryListProps {
  children: React.ReactNode;
  endpoint: string;
}

export default function CategoryList({
  children,
  endpoint,
}: CategoryListProps) {
  return (
    <div className=" md:px-0 px-2 pt-5">
      <div className="container mx-auto">{children}</div>

      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid endpoint={endpoint} />
      </Suspense>
    </div>
  );
}
