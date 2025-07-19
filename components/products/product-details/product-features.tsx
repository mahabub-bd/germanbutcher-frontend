import { Award, Clock, Shield, Truck } from "lucide-react";

export function ProductFeatures() {
  const features = [
    {
      icon: Truck,
      label: "Free Delivery",
      desc: "On orders over ৳1500",
    },
    {
      icon: Shield,
      label: "Quality Assured",
      desc: "100% fresh guarantee",
    },
    {
      icon: Clock,
      label: "Fresh Daily",
      desc: "Delivered within 24hrs",
    },
    {
      icon: Award,
      label: "Premium Quality",
      desc: "Certified suppliers",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, label, desc }) => (
        <div
          key={label}
          className="bg-white rounded-md  md:p-6 p-4 shadow-sm border"
        >
          <Icon className="w-6 h-6 text-primaryColor mx-auto mb-2" />
          <h4 className="font-medium text-sm text-gray-900">{label}</h4>
          <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
      ))}
    </div>
  );
}
