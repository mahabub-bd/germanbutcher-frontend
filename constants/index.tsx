// constants/index.ts
import { GermanQuality, HalalImage } from "@/public/images";
import fastDelivery from "@/public/images/fastdelivery.png";

export type FeatureData = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  iconBgColor?: string; // Optional for custom background colors
};

export const defaultFeaturesData: FeatureData[] = [
  {
    iconSrc: HalalImage.src,
    iconAlt: "Halal Certified",
    title: "100% Halal Certified",
    description:
      "We have been certified by Halal Bangladesh Services Ltd (Certificate No. HBM10010322/221)",
    iconBgColor: "green",
  },
  {
    iconSrc: fastDelivery.src,
    iconAlt: "Fast Delivery",
    title: "Superfast Delivery",
    description:
      "Get your order delivered to your doorstep at the earliest from Quality food stores near you.",
    iconBgColor: "blue",
  },
  {
    iconSrc: GermanQuality.src,
    iconAlt: "Original German Quality",
    title: "Original German Quality",
    description:
      "Authentic German products with traditional craftsmanship and superior quality standards.",
    iconBgColor: "orange",
  },
  {
    iconSrc: GermanQuality.src,
    iconAlt: "Easy Returns",
    title: "Easy Returns",
    description:
      "Not satisfied with a product? you can always exchange for your desired product.",
    iconBgColor: "purple",
  },
];
