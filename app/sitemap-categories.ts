import { fetchData } from "@/utils/api-utils";
import { Category } from "@/utils/types";
import { MetadataRoute } from "next";

export default async function categorySitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://test.germanbutcherbd.com";

  try {
    const categories: Category[] = await fetchData("categories");

    return categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug || category.id}`,
      lastModified: new Date(category.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating category sitemap:", error);
    return [];
  }
}
