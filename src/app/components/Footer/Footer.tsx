"use client";
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {/* Reach us section */}
          <div className="flex flex-col">
            <h3 className="text-cyan-400 text-xl font-semibold mb-6">Reach us</h3>
            <div className="space-y-3">
              <p className="text-lg font-medium text-gray-200">GK Cloud Solutions Pvt Ltd</p>
              <p className="text-gray-400">No. 81/37, 1st Floor,</p>
              <p className="text-gray-400">The Hulkul, Lavelle Road,</p>
              <p className="text-gray-400">Bangalore - 560001</p>
              <div className="flex items-center gap-3 mt-6 text-gray-400">
                <svg className="w-5 h-5 text-lavender-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+91 9364893718</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-5 h-5 text-lavender-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>support@gkcloud.ai</span>
              </div>
            </div>
          </div>

          {/* Follow us section */}
          <div className="flex flex-col">
            <h3 className="text-lavender-400 text-xl font-semibold mb-6">Follow us</h3>
            <div className="flex gap-8">
              <Link 
                href="https://twitter.com/gkcloud" 
                target="_blank" 
                className="text-gray-400 hover:text-lavender-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={28} />
              </Link>
              <Link 
                href="https://instagram.com/gkcloud" 
                target="_blank" 
                className="text-gray-400 hover:text-lavender-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={28} />
              </Link>
              <Link 
                href="https://www.youtube.com/@GKCloudSolutions" 
                target="_blank" 
                className="text-gray-400 hover:text-lavender-400 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={28} />
              </Link>
              <Link 
                href="https://linkedin.com/company/gkcloud" 
                target="_blank" 
                className="text-gray-400 hover:text-lavender-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={28} />
              </Link>
              <Link 
                href="https://www.facebook.com/profile.php?id=61557901947109" 
                target="_blank" 
                className="text-gray-400 hover:text-lavender-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={28} />
              </Link>
            </div>
          </div>

          {/* Company section */}
          <div className="flex flex-col">
            <h3 className="text-lavender-400 text-xl font-semibold mb-6">Company</h3>
            <div className="space-y-3">
              <Link 
                href="/about" 
                className="block text-gray-400 hover:text-lavender-400 transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/privacy-policy" 
                className="block text-gray-400 hover:text-lavender-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="block text-gray-400 hover:text-lavender-400 transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800 text-gray-400">
          <p>© 2024 GK Cloud Solutions Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 