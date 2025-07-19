import { getBlurData } from "@/utils/blur-generator";
import { Recipe } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

interface RecipeProps {
  recipe: Recipe;
}
export default async function RecipeCard({ recipe }: RecipeProps) {
  const { base64 } = await getBlurData(recipe?.attachment?.url);
  return (
    <div>
      <Link
        href={`/recipe/${recipe?.id}`}
        className="w-full h-full block group"
      >
        {/* Image Wrapper */}
        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
          <Image
            src={recipe?.attachment?.url}
            alt={recipe?.title}
            fill
            placeholder="blur"
            blurDataURL={base64}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] py-3 lg:py-4 px-5 bg-gradient-to-r from-primaryColor to-secondaryColorrounded-lg z-10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg  font-semibold text-whiteColor">
                  {recipe?.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
