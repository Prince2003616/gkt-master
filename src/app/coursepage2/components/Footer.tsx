import React from "react";
import Image from "next/image";
import { IoIosMail } from "react-icons/io";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPhoneVolume, FaLocationDot } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0f1c] text-gray-400 py-10 text-xs">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-8">
        {/* MetaCognitive Section */}
        <div>
            <div className="flex py-2">
                <Image src="/metalogo.png" alt="Meta Cognitive Logo" width={100} height={120} className="object-contain"/>
            </div>
            <p className="text-xs leading-relaxed">
                We are committed to leading the way in reshaping how individuals
                learn, develop, and attain their educational and career goals. As
                the vanguard of the educational revolution, we provide cutting-edge
                AI-infused learning solutions crafted to revolutionize your learning
                journey.
            </p>
            <div className="flex space-x-4 mt-4">
                <FaFacebook className="text-white hover:text-green-500 cursor-pointer text-2xl" />
                <FaInstagram className="text-white hover:text-green-500 cursor-pointer text-2xl" />
                <FaLinkedin className="text-white hover:text-green-500 cursor-pointer text-2xl" />
                <FaWhatsapp className="text-white hover:text-green-500 cursor-pointer text-2xl" />
            </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-6">
            <li>
              <a href="#" className="hover:text-green-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Courses */}
        <div>
        <h3 className="text-white font-bold text-lg mb-3">Courses</h3>
        <ul className="space-y-6">
            <li>
            <a href="#" className="hover:text-green-500 transition-colors duration-200">
                Associate Cloud Engineer Certification
            </a>
            </li>
            <li>
            <a href="#" className="hover:text-green-500 transition-colors duration-200">
                Multi Cloud Certification
            </a>
            </li>
            <li>
            <a href="#" className="hover:text-green-500 transition-colors duration-200">
                Multi-Platform Prompt Engineering Bootcamp
            </a>
            </li>
            <li>
            <a href="#" className="hover:text-green-500 transition-colors duration-200">
                Tableau For Desktop
            </a>
            </li>
        </ul>
        </div>

        {/* Contact */}
        <div>
        <h3 className="text-white font-bold text-lg mb-3">Contact</h3>
        <ul className="space-y-6">
            {/* Email */}
            <li>
            <a
                href="mailto:hello@metacognitive.co.in"
                className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors duration-300"
            >
                <IoIosMail className="text-current text-xl" />
                <span>hello@metacognitive.co.in</span>
            </a>
            </li>

            {/* Phone */}
            <li>
            <a
                href="tel:+918970007858"
                className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors duration-300"
            >
                <FaPhoneVolume className="text-current text-xl" />
                <span>+91 8970007858</span>
            </a>
            </li>

            {/* Address */}
            <li className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors duration-300">
            <FaLocationDot className="text-current text-xl" />
            <span>
                #714A, Spencer Plaza Phase 2, 7th Floor, Anna Road, Chennai-600002.
            </span>
            </li>
        </ul>
        </div>

    </div>


      {/* Bottom Section */}
      <div className="text-center py-4 text-white">
        &copy; Copyright 2023{" "}
        <span className="text-green-500 font-semibold">Metacognitive</span>. All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
