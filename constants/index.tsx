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

export const bangladeshData = {
  Barisal: [
    "Barguna",
    "Barisal",
    "Bhola",
    "Jhalokathi",
    "Patuakhali",
    "Pirojpur",
  ],
  Chittagong: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chittagong",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachhari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: [
    "Bogra",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Nawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
};

export type Division = keyof typeof bangladeshData;
export const divisions = Object.keys(bangladeshData) as Division[];
