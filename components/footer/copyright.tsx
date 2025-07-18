import { OnlinePayment } from "@/public/images";
import Image from "next/image";
import Link from "next/link";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t-4 border-[#deb149] bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-sm text-white md:pb-10 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Content Section */}
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12  items-center h-full">
            {/* Payment Methods - 50% width */}
            <div className="col-span-1 md:col-span-8 flex flex-col items-center space-y-4">
              <h3 className="font-semibold text-2xl gradient-text ">
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

            <div className="col-span-1 md:col-span-4 flex  md:flex-row items-center justify-center md:gap-4 gap-4 mx-auto">
              <Link
                className="px-4 md:px-4 py-2 md:py-2.5 text-xs  text-gray-300 border border-[#deb149] rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-[#deb149] hover:text-black hover:border-[#deb149] hover:scale-105 hover:shadow-lg hover:shadow-[#deb149]/20 group overflow-hidden "
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="px-4 md:px-4 py-2 md:py-2.5 text-xs  text-gray-300 border border-[#deb149] rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-[#deb149] hover:text-black hover:border-[#deb149] hover:scale-105 hover:shadow-lg hover:shadow-[#deb149]/20 group overflow-hidden "
                href="/refund-policy"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-5">
            <div className="col-span-1 md:col-span-3 text-center gradient-text md:text-left flex justify-center items-center">
              <p className="  text-sm  font-medium">
                © {currentYear} German Butcher All rights reserved.
              </p>
            </div>
            <Link
              href="https://www.techqul.com"
              className="text-gray-400 text-xs md:text-sm"
            >
              Designed & Developed with ❤️ by Techqul
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
