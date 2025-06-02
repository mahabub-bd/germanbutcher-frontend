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
    <footer className="bg-[#8B0000] text-white px-6 py-10 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
        {/* Logo and Description */}
        <div className="space-y-4 col-span-2">
          <Image
            src="/placeholder.svg?height=80&width=100&text=Logo"
            alt="Logo"
            width={100}
            height={80}
          />
          <div className="flex space-x-2">
            <Image
              src="/placeholder.svg?height=41&width=41&text=1"
              alt="Logo1"
              width={41}
              height={41}
            />
            <Image
              src="/placeholder.svg?height=41&width=41&text=2"
              alt="Logo2"
              width={41}
              height={41}
            />
            <Image
              src="/placeholder.svg?height=41&width=41&text=3"
              alt="Logo3"
              width={41}
              height={41}
            />
          </div>
          <p className="text-sm">
            Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a
            lacinia curabitur lacinia mollis.
          </p>
          <div className="flex space-x-4 pt-2">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          </div>
        </div>
        <div className="md:col-span-1"></div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Our Gallery
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Our Blogs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Menu */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Our Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Burger King
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Pizza King
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Fresh Food
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                Vegetable
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+880 1600000000</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@gmail.com</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>Amigo D-149 Square, Mohammadpur, Dhaka 1207</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-white/20 pt-4 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>Copyright@ Food Network.</p>
        <div className="space-x-4 mt-3 md:mt-0">
          <button className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-[#8B0000] transition-colors">
            Terms & Conditions
          </button>
          <button className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-[#8B0000] transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
