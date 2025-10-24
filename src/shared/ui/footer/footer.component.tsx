import { Button } from "@heroui/button";
import { Link } from "@/shared/lib/i18n/navigation";

export const Footer = () => {
  return (
    <footer className="bg-[#1a1f2e] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-32 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding and Social Media */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 bg-white rounded-full flex items-center
                  justify-center">
                <svg
                  className="w-5 h-5 text-[#1a1f2e]"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  <path d="M9 9h6v2H9zm0 4h6v2H9z" />
                </svg>
              </div>
              <span className="text-xl font-bold">myIQ</span>
            </div>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-red-500 rounded-full flex items-center
                  justify-center hover:bg-red-600 transition-colors">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.46-2.07 4.533-.98.9-2.27 1.4-3.498 1.4-1.228 0-2.518-.5-3.498-1.4-1.174-1.073-1.901-2.675-2.07-4.533-.169-1.858.169-3.46 1.174-4.533.98-.9 2.27-1.4 3.498-1.4 1.228 0 2.518.5 3.498 1.4 1.005 1.073 1.343 2.675 1.174 4.533z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center
                  justify-center hover:bg-gray-800 transition-colors">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500
                  rounded-full flex items-center justify-center
                  hover:from-purple-600 hover:to-pink-600 transition-colors">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center
                  justify-center hover:bg-blue-700 transition-colors">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-11.999-12-11.999s-12 5.372-12 11.999c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Support</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                How to Cancel
              </Link>
              <Button
                variant="bordered"
                className="border-white text-white hover:bg-white
                  hover:text-[#1a1f2e] transition-colors"
                startContent={
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                }>
                Customer Support 24/7/365
              </Button>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Terms & Conditions
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Help
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Blog
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Reviews
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white
                  transition-colors">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-32 py-6">
          <div
            className="flex flex-col lg:flex-row justify-between items-center
              space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-300">
              Copyright © 2024-2025 myIQ™. All rights reserved. All trademarks
              referenced herein are the properties of their respective owners.
            </div>

            {/* Payment Methods and Language */}
            <div className="flex items-center space-x-6">
              {/* Payment Methods */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-5 bg-blue-600 rounded flex items-center
                    justify-center">
                  <svg
                    className="w-6 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h21A1.5 1.5 0 0 1 24 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 19.5v-15zM1.5 4.5v15h21v-15h-21z" />
                    <path d="M8.5 8.5h7v7h-7v-7z" />
                  </svg>
                </div>
                <div
                  className="w-8 h-5 bg-red-500 rounded flex items-center
                    justify-center">
                  <svg
                    className="w-6 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M8 12l2 2 4-4" />
                  </svg>
                </div>
                <div
                  className="w-8 h-5 bg-blue-500 rounded flex items-center
                    justify-center">
                  <svg
                    className="w-6 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.543-.68c-1.01-1.15-2.96-1.81-5.69-1.81H5.998c-.524 0-.968.382-1.05.9L2.47 20.597h4.606l1.12-7.106c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.137-1.012-4.287z" />
                  </svg>
                </div>
                <div
                  className="w-8 h-5 bg-black rounded flex items-center
                    justify-center">
                  <svg
                    className="w-6 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415.789-2.415 2.123 0 1.334 1.467 2.123 2.415 2.123.948 0 2.415-.789 2.415-2.123 0-1.334-1.467-2.123-2.415-2.123zM12.152 12.896c-1.998 0-3.415-1.344-3.415-3.123 0-1.779 1.417-3.123 3.415-3.123 1.998 0 3.415 1.344 3.415 3.123 0 1.779-1.417 3.123-3.415 3.123z" />
                    <path d="M12.152 6.896c-.948 0-2.415.789-2.415 2.123 0 1.334 1.467 2.123 2.415 2.123.948 0 2.415-.789 2.415-2.123 0-1.334-1.467-2.123-2.415-2.123z" />
                  </svg>
                </div>
                <div
                  className="w-8 h-5 bg-gradient-to-r from-blue-500 to-green-500
                    rounded flex items-center justify-center">
                  <svg
                    className="w-6 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
              </div>

              {/* Language Selector */}
              <Button
                variant="bordered"
                className="border-white text-white hover:bg-white
                  hover:text-[#1a1f2e] transition-colors"
                endContent={
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                }>
                English
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
