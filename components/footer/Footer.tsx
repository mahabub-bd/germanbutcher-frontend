import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
export default function Footer() {
  return (
    <footer className="bg-[#8B0000] text-white px-6 py-10 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
        {/* Logo and Description */}
        <div className="space-y-4 col-span-2">
          <Image src="/images/logo3.png" alt="Logo" width={100} height={80} />
          <div className="flex space-x-2">
            <Image src="/logo/footer1.png" alt="Logo1" width={41} height={41} />
            <Image src="/logo/footer2.png" alt="Logo2" width={41} height={41} />
            <Image src="/logo/footer3.png" alt="Logo3" width={41} height={41} />
          </div>
          <p className="text-sm">
            Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a
            lacinia curabitur lacinia mollis.
          </p>
          <div className="flex space-x-4 pt-2">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaYoutube />
            <FaTwitter />
          </div>
        </div>
        <div className=" md:col-span-1"></div>
        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Our Gallery</Link>
            </li>
            <li>
              <Link href="#">Our Blogs</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Our Menu */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Our Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Burger King</Link>
            </li>
            <li>
              <Link href="#">Pizza King</Link>
            </li>
            <li>
              <Link href="#">Fresh Food</Link>
            </li>
            <li>
              <Link href="#">Vegetable</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <FiPhone /> <span>+880 1600000000</span>
            </li>
            <li className="flex items-center space-x-2">
              <FiMail /> <span>info@gmail.com</span>
            </li>
            <li className="flex items-start space-x-2">
              <FiMapPin />
              <span>Amigo D-149 Square, Mohammadpur, Dhaka 1207</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-white/20 pt-4 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>Copyright@ Food Network.</p>
        <div className="space-x-4 mt-3 md:mt-0">
          <button className="border border-white px-4 py-1 rounded-full">
            Terms & Conditions
          </button>
          <button className="border border-white px-4 py-1 rounded-full">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
