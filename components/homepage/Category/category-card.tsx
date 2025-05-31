import { Category } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug || category.id}`}
      className="group block rounded-lg overflow-hidden transition-all duration-300"
    >
      {/* Image Container - LCP Element */}
      <div className=" flex w-full items-center justify-center">
        <div className="relative w-[60px] h-[60px] xs:w-[80px] xs:h-[80px] sm:w-[100px] sm:h-[100px] md:w-[132px] md:h-[132px] rounded-full p-2 flex items-center justify-center bg-white border-2 border-dashed border-primaryColor">
          <Image
            src={category?.attachment?.url || "/category-placeholder.svg"}
            alt={category?.name || "Product category"}
            width={600}
            height={600}
            className="object-cover w-full h-full rounded-full  transition-transform duration-300 group-hover:scale-105"
            priority={true}
            loading="eager"
          />
        </div>
      </div>

      {/* Category Name */}
      <div className="p-2   text-center border-t border-gray-100">
        <h3 className="text-sm xs:text-base sm:text-lg font-semibold md:text-xl text-primaryColor group-hover:text-primary transition-colors line-clamp-2 h-[40px] flex items-center justify-center">
          {category?.name}
        </h3>
      </div>
    </Link>
  );
}
