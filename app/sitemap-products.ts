import { fetchData } from "@/utils/api-utils";
import { Product } from "@/utils/types";
import { MetadataRoute } from "next";

export default async function productSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://test.germanbutcherbd.com";

  try {
    const products: Product[] = await fetchData(
      "products?limit=10000&isActive=true"
    );

    return products.map((product) => ({
      url: `${baseUrl}/products/${product.slug || product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: product.isFeatured ? 0.9 : 0.7,

      alternates: {
        languages: {
          en: `${baseUrl}/en/products/${product.slug}`,
        },
      },
    }));
  } catch (error) {
    console.error("Error generating product sitemap:", error);
    return [];
  }
}
