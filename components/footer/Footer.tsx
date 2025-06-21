import {
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
    <footer className="relative bg-gradient-to-br from-[#8a0000] via-[#6d0000] to-[#8a0000] text-white overflow-hidden md:pb-0 pb-15">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto relative py-8 md:py-16 md:px-0 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4 md:space-y-6 col-span-1 md:col-span-12 lg:col-span-4 flex flex-col items-center md:items-start justify-center">
            <div className="group">
              <div className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 inline-block transition-all duration-300 group-hover:bg-white/15 group-hover:scale-105">
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
                    className="p-1.5 md:p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-110 hover:rotate-3"
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

            <p className="text-red-100 leading-relaxed text-sm md:text-base text-center md:text-left">
              Pioneer of authentic German Sausages in Bangladesh since 1991.
              Premium quality gourmet sausages, cold cuts, and meat products.
            </p>

            <div className="flex space-x-3 md:space-x-4 pt-1 md:pt-2">
              {[Facebook, Linkedin, Youtube, Twitter].map((Icon, index) => (
                <div
                  key={index}
                  className="p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 cursor-pointer transition-all duration-300 hover:bg-[#c70909] hover:scale-110 hover:border-[#c70909] group"
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
                <h2 className="font-bold text-lg md:text-xl mb-4 md:mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  Quick Links
                </h2>
                <div className="absolute -left-2 top-0 w-1 h-6 md:h-8 bg-gradient-to-b from-[#c70909] to-red-400 rounded-full"></div>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {["About Us", "Our Gallery", "Our Blogs", "FAQ"].map(
                  (link, index) => (
                    <li key={index} className="group">
                      <Link
                        href="#"
                        className="flex items-center space-x-2 text-red-100 hover:text-white transition-all duration-300 group-hover:translate-x-2 text-sm md:text-base"
                      >
                        <div className="w-1 h-1 bg-red-300 rounded-full transition-all duration-300 group-hover:bg-[#c70909] group-hover:scale-150"></div>
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
                <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  Our Menu
                </h3>
                <div className="absolute -left-2 top-0 w-1 h-6 md:h-8 bg-gradient-to-b from-red-400 to-[#c70909] rounded-full"></div>
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
                      className="flex items-center space-x-2 text-red-100 hover:text-white transition-all duration-300 group-hover:translate-x-2 text-sm md:text-base"
                    >
                      <div className="w-1 h-1 bg-red-300 rounded-full transition-all duration-300 group-hover:bg-[#c70909] group-hover:scale-150"></div>
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
              <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Contact Us
              </h3>
              <div className="absolute -left-2 top-0 w-1 h-6 md:h-8 bg-gradient-to-b from-[#c70909] to-red-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6">
              {/* Contact Information */}
              <div className="space-y-4 md:space-y-5">
                <div className="group flex items-center space-x-3 md:space-x-4">
                  <div className="p-2 md:p-3 bg-[#c70909]/20 backdrop-blur-sm rounded-xl border border-[#c70909]/30 transition-all duration-300 group-hover:bg-[#c70909]/30 group-hover:scale-110">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-red-200" />
                  </div>
                  <div>
                    <p className="text-red-200 text-xs md:text-sm font-medium">
                      Call Us
                    </p>
                    <span className="text-red-100 group-hover:text-white transition-colors text-sm md:text-base">
                      +880 1600000000
                    </span>
                  </div>
                </div>

                <div className="group flex items-center space-x-3 md:space-x-4">
                  <div className="p-2 md:p-3 bg-[#c70909]/20 backdrop-blur-sm rounded-xl border border-[#c70909]/30 transition-all duration-300 group-hover:bg-[#c70909]/30 group-hover:scale-110">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-red-200" />
                  </div>
                  <div>
                    <p className="text-red-200 text-xs md:text-sm font-medium">
                      Email Us
                    </p>
                    <span className="text-red-100 group-hover:text-white transition-colors text-sm md:text-base">
                      info@germanbutcher.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="group flex items-start space-x-3 md:space-x-4">
                <div className="p-2 md:p-3 bg-[#c70909]/20 backdrop-blur-sm rounded-xl border border-[#c70909]/30 transition-all duration-300 group-hover:bg-[#c70909]/30 group-hover:scale-110">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-200 mt-0.5" />
                </div>
                <div>
                  <p className="text-red-200 text-xs md:text-sm font-medium mb-1">
                    Visit Us
                  </p>
                  <span className="text-red-100 group-hover:text-white transition-colors leading-relaxed block text-sm md:text-base">
                    Amigo D-149 Square, Mohammadpur, Dhaka 1207, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-red-100 text-xs md:text-sm">
              © 2025 German Butcher. All rights reserved.
            </p>
            <div className="flex space-x-2 md:space-x-4 mt-3 md:mt-0">
              {["Terms & Conditions", "Privacy Policy"].map((text, index) => (
                <button
                  key={index}
                  className="relative px-2 md:px-6 py-1.5 md:py-2 text-xs md:text-sm text-red-100 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-[#c70909] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#c70909]/20 group overflow-hidden"
                >
                  <span className="relative z-10">{text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c70909]/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
