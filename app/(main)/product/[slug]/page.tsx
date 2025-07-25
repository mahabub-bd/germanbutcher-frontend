import ProductDetails from "@/components/products/product-details/product-details";
import { fetchData } from "@/utils/api-utils";
import { notFound } from "next/navigation";
import { Product } from "../../../../utils/types";

// Cache revalidation - regenerate page every 60 seconds
export const revalidate = 60;

// Generate pages for unknown paths on-demand
export const dynamicParams = true;

// Generate static params for pre-rendering at build time
export async function generateStaticParams() {
  try {
    // Fetch all products to generate static paths
    const products: Product[] = await fetchData("products");

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return empty array if API is not available during build
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const product: Product = await fetchData(`products/slug/${slug}`);

    return {
      title: `${product.name} | German Butcher`,
      description:
        product.description ||
        `High-quality ${product.name} from German Butcher. Fresh meat and specialty products delivered to your doorstep.`,
      keywords: `${product.name}, German Butcher, fresh meat, ${product.category || "meat products"}`,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.attachment.url,
        type: "product",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        images: product.attachment.url,
      },
    };
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
    return {
      title: "Product Not Found | German Butcher",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const product: Product = await fetchData(`products/slug/${slug}`);

    // If product is not found, show 404
    if (!product) {
      notFound();
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.attachment.url,
      brand: {
        "@type": "Brand",
        name: "German Butcher",
      },
      offers: {
        "@type": "Offer",
        price: product.sellingPrice,
        priceCurrency: "BDT",
        availability: product.stock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "German Butcher",
        },
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <ProductDetails product={product} />
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);

    notFound();
  }
}
