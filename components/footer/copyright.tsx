import { OnlinePayment } from "@/public/images";
import Image from "next/image";
import Link from "next/link";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t-4 border-[#deb149] bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Content Section */}
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
            {/* Copyright Text - 25% width */}
            <div className="col-span-1 md:col-span-3 text-center md:text-left">
              <p className="text-[#deb149] text-sm  font-medium">
                © {currentYear} German Butcher All rights reserved.
              </p>
            </div>

            {/* Payment Methods - 50% width */}
            <div className="col-span-1 md:col-span-6 flex flex-col items-center space-y-4">
              <h3 className="font-semibold text-lg text-white">
                Online Payment
              </h3>
              <div className="w-full ">
                <Image
                  src={OnlinePayment}
                  alt="Online Payment Methods"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Legal Links - 25% width */}
            <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-center md:justify-end space-y-3 md:space-y-0 md:space-x-4">
              {["Terms & Conditions", "Privacy Policy"].map((text, index) => (
                <button
                  key={index}
                  className="relative px-4 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-gray-300 border border-[#deb149] rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-[#deb149] hover:text-black hover:border-[#deb149] hover:scale-105 hover:shadow-lg hover:shadow-[#deb149]/20 group overflow-hidden min-w-[140px]"
                >
                  <span className="relative z-10 font-medium">{text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#deb149]/10 to-[#deb149]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <Link
              href="https://www.techqul.com/"
              className="text-gray-400 text-xs md:text-sm"
            >
              Designed & Developed with ❤️ by Techqul
            </Link>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="text-gray-500 text-xs">Follow us:</span>
              <div className="flex space-x-2">
                {["Facebook", "Instagram", "Twitter"].map((social, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#deb149] transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white">
                      {social[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
