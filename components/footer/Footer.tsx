import {
  BgFooter,
  FooterImageOne,
  FooterImageThree,
  FooterImageTwo,
  GermanbutcherLogo,
} from "@/public/images";
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgFooter.src})`,

          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primaryColor/90 via-[#6d0000]/90 to-primaryColor/90" />

      {/* Additional Pattern Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto relative z-10 py-8 md:py-16 md:px-0 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4 md:space-y-6 col-span-1 md:col-span-12 lg:col-span-4 flex flex-col items-center md:items-start justify-center">
            <div className="group">
              <div className="p-3 md:p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/30 inline-block transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 shadow-lg">
                <Image
                  src={GermanbutcherLogo || "/placeholder.svg"}
                  alt="German Butcher Logo"
                  width={80}
                  height={80}
                  className="md:w-[96px] md:h-[96px]"
                />
              </div>
            </div>

            <div className="flex space-x-2 md:space-x-3">
              {[FooterImageOne, FooterImageTwo, FooterImageThree].map(
                (img, index) => (
                  <div
                    key={index}
                    className="p-1.5 md:p-2 bg-white/15 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:rotate-3 shadow-md"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Certification ${index + 1}`}
                      width={35}
                      height={35}
                      className="md:w-[45px] md:h-[45px]"
                    />
                  </div>
                )
              )}
            </div>

            <div className="flex space-x-3 md:space-x-4 pt-1 md:pt-2">
              {[Facebook, Linkedin, Youtube, Twitter].map((Icon, index) => (
                <div
                  key={index}
                  className="p-2 md:p-3 bg-white/15 backdrop-blur-sm rounded-full border border-white/30 cursor-pointer transition-all duration-300 hover:bg-[#c70909] hover:scale-110 hover:border-[#c70909] group shadow-md"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links and Our Menu - Single row on mobile */}
          <div className="col-span-1 md:col-span-7 lg:col-span-4 grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8">
            {/* Quick Links */}
            <div>
              <div className="relative">
                <h2 className="font-bold text-lg md:text-xl mb-4 md:mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                  Quick Links
                </h2>
                <div className="absolute -left-2 top-0 w-1 h-6 md:h-8 bg-gradient-to-b from-[#c70909] to-red-400 rounded-full shadow-sm"></div>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {["About Us", "Our Gallery", "Our Blogs", "FAQ"].map(
                  (link, index) => (
                    <li key={index} className="group">
                      <Link
                        href="#"
                        className="flex items-center space-x-2 text-red-50 hover:text-white transition-all duration-300 group-hover:translate-x-2 text-sm md:text-base"
                      >
                        <div className="w-1 h-1 bg-red-200 rounded-full transition-all duration-300 group-hover:bg-[#c70909] group-hover:scale-150"></div>
                        <span>{link}</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Our Menu */}
            <div>
              <div className="relative">
                <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                  Our Menu
                </h3>
                <div className="absolute -left-2 top-0 w-1 h-6 md:h-8 bg-gradient-to-b from-red-400 to-[#c70909] rounded-full shadow-sm"></div>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "German Sausages",
                  "Cold Cuts",
                  "Premium Meat",
                  "Fresh Products",
                ].map((item, index) => (
                  <li key={index} className="group">
                    <Link
                      href="#"
                      className="flex items-center space-x-2 text-red-50 hover:text-white transition-all duration-300 group-hover:translate-x-2 text-sm md:text-base"
                    >
                      <div className="w-1 h-1 bg-red-200 rounded-full transition-all duration-300 group-hover:bg-[#c70909] group-hover:scale-150"></div>
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4">
            <div className="relative">
              <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                Contact Us
              </h3>
              <div className="absolute -left-2 top-0 w-1 h-6 md:h-8 bg-gradient-to-b from-[#c70909] to-red-500 rounded-full shadow-sm"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6">
              {/* Contact Information */}
              <div className="space-y-4 md:space-y-5">
                <div className="group flex items-center space-x-3 md:space-x-4">
                  <div className="p-2 md:p-3 bg-[#c70909]/30 backdrop-blur-sm rounded-xl border border-[#c70909]/40 transition-all duration-300 group-hover:bg-[#c70909]/40 group-hover:scale-110 shadow-md">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-red-100" />
                  </div>
                  <div>
                    <p className="text-red-100 text-xs md:text-sm font-medium">
                      Call Us
                    </p>
                    <span className="text-red-50 group-hover:text-white transition-colors text-sm md:text-base">
                      +880 1600000000
                    </span>
                  </div>
                </div>

                <div className="group flex items-center space-x-3 md:space-x-4">
                  <div className="p-2 md:p-3 bg-[#c70909]/30 backdrop-blur-sm rounded-xl border border-[#c70909]/40 transition-all duration-300 group-hover:bg-[#c70909]/40 group-hover:scale-110 shadow-md">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-red-100" />
                  </div>
                  <div>
                    <p className="text-red-100 text-xs md:text-sm font-medium">
                      Email Us
                    </p>
                    <span className="text-red-50 group-hover:text-white transition-colors text-sm md:text-base">
                      info@germanbutcher.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group flex items-start space-x-3 md:space-x-4">
                <div className="p-2 md:p-3 bg-[#c70909]/30 backdrop-blur-sm rounded-xl border border-[#c70909]/40 transition-all duration-300 group-hover:bg-[#c70909]/40 group-hover:scale-110 shadow-md">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-100 mt-0.5" />
                </div>
                <div>
                  <p className="text-red-100 text-xs md:text-sm font-medium mb-1">
                    Visit Us
                  </p>
                  <span className="text-red-50 group-hover:text-white transition-colors leading-relaxed block text-sm md:text-base">
                    Amigo D-149 Square, Mohammadpur, Dhaka 1207, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
