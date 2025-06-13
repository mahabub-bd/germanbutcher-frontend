import { getBlurData } from "@/utils/blur-generator";
import { Category } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export async function CategoryCard({ category }: { category: Category }) {
  const { base64 } = await getBlurData(category?.attachment?.url);
  return (
    <Link
      href={`/categories/${category.slug || category.id}`}
      className="group block rounded-lg overflow-hidden transition-all duration-300"
    >
      <div className="flex w-full items-center justify-center">
        <div className="relative md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-full p-2 flex items-center justify-center  border-2 border-dashed border-primaryColor">
          <Image
            src={category?.attachment?.url || "/category-placeholder.svg"}
            alt={`${category?.name} category icon`}
            width={600}
            height={600}
            className="object-cover w-full  h-full rounded-full transition-transform duration-300 group-hover:scale-105"
            priority={true}
            loading="eager"
            placeholder="blur"
            blurDataURL={base64}
          />
        </div>
      </div>

      <div className="p-2 text-center">
        <h3 className="text-md  sm:text-lg font-semibold md:text-xl text-primaryColor group-hover:text-primary transition-colors line-clamp-2 h-[50px] flex items-center justify-center">
          {category?.name}
        </h3>
      </div>
    </Link>
  );
}
