import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const MainHeader: React.FC = () => {
  return (
    <header className="bg-[#050b1b] text-white">
      {/* Container for Left and Right Sections */}
      <div className="flex">
        {/* Left Section: Logo */}
        <div className="w-1/5 flex items-center justify-center py-2">
          <Image
            src="/metalogo.png"
            alt="Meta Cognitive Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="w-4/5 flex flex-col border-l border-gray-700">
          {/* Top Section */}
          <div className="flex justify-between items-center px-8 py-2">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" target="_blank" aria-label="Facebook" className="hover:text-green-400">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" aria-label="Instagram" className="hover:text-green-400">
                <FaInstagram />
              </a>
              <a href="#" target="_blank" aria-label="LinkedIn" className="hover:text-green-400">
                <FaLinkedin />
              </a>
              <a href="#" target="_blank" aria-label="WhatsApp" className="hover:text-green-400">
                <FaWhatsapp />
              </a>
            </div>

            {/* Email */}
            <a href="mailto:hello@metacognitive.co.in" className="hover:text-green-400">
              hello@metacognitive.co.in
            </a>

            {/* Policies */}
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy-policy" className="hover:text-green-400">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="hover:text-green-400">
                Refund Policy
              </Link>
              <Link href="/contact" className="hover:text-green-400">
                Contact
              </Link>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-700"></div>

          {/* Bottom Section */}
          <div className="flex justify-between items-center px-8 py-4">
            {/* Navigation Links */}
            <nav className="flex space-x-6 text-sm">
              <Link href="/" className="hover:text-green-400">
                Home
              </Link>
              <Link href="/about" className="hover:text-green-400">
                About
              </Link>
              <div className="relative group">
                <Link href="/courses" className="hover:text-green-400">
                  Courses ▼
                </Link>
                <div className="absolute hidden group-hover:block bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <Link href="/courses/course1" className="block px-4 py-1 hover:bg-green-200">
                    Course 1
                  </Link>
                  <Link href="/courses/course2" className="block px-4 py-1 hover:bg-green-200">
                    Course 2
                  </Link>
                </div>
              </div>
              <Link href="/contact-us" className="hover:text-green-400">
                Contact Us
              </Link>
            </nav>

            {/* Enroll Button */}
            <div>
              <Link href="/enroll">
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-3xl text-white text-sm flex items-center">
                  Enroll
                  <span className="ml-1">🎓</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
