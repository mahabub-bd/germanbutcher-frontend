import { BgFooter, GermanbutcherLogo } from "@/public/images";
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
    <footer className="relative text-white overflow-hidden bg-gradient-to-br from-primaryColor via-[#6d0000] to-primaryColor">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url(${BgFooter.src})`,
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="container mx-auto relative z-10 py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          {/* Logo Section - 20% width */}
          <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-start space-y-6">
            {/* Logo Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <Image
                src={GermanbutcherLogo || "/placeholder.svg"}
                alt="German Butcher Logo"
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-contain"
              />
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, bg: "bg-[#1877f2]" },
                { Icon: Linkedin, bg: "bg-[#0077b5]" },
                { Icon: Youtube, bg: "bg-[#ff0000]" },
                { Icon: Twitter, bg: "bg-[#1da1f2]" },
              ].map(({ Icon, bg }, index) => (
                <div
                  key={index}
                  className={`p-3 ${bg} rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Menu Section - 50% width */}
          <div className="col-span-1 md:col-span-6 flex flex-col items-center md:items-start space-y-6">
            {/* Section Header */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl text-white mb-4">Quick Links</h3>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="group">
                  <Link
                    href="/about-us"
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"></div>
                    <span className="font-medium">Our Story</span>
                  </Link>
                </div>

                <div className="group">
                  <Link
                    href="/contact-us"
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"></div>
                    <span className="font-medium">Contact Us</span>
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div className="group">
                  <Link
                    href="/faqs"
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"></div>
                    <span className="font-medium">FAQ</span>
                  </Link>
                </div>

                <div className="group">
                  <Link
                    href="/recipes"
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"></div>
                    <span className="font-medium">Recipes</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us Section - 30% width */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center md:items-start space-y-6">
            {/* Section Header */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl text-white mb-4">Contact Us</h3>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 w-full">
              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Call Us</p>
                  <span className="text-white font-medium">
                    +880 1600000000
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Email Us</p>
                  <span className="text-white font-medium">
                    info@germanbutcher.com
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    Visit Us
                  </p>
                  <span className="text-white font-medium leading-relaxed block text-sm">
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
