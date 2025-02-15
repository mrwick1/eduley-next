'use client'

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext"

const Footer = () => {
  const { config } = useTheme();

  return (
    <footer className="relative bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-600 dark:text-gray-300 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-50"
        style={{
          background: `linear-gradient(135deg, ${config?.primary_color || '#6C1717'}33 0%, transparent 100%)`
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            {config?.logo ? (
              <Image
                src={config.logo}
                alt={config?.name || 'Institute Logo'}
                width={120}
                height={40}
                className="object-contain dark:brightness-110"
              />
            ) : (
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {config?.name || 'Eduley'}
              </h3>
            )}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {config?.tagline || 'Empowering dreams through education'}
            </p>
            <div className="flex space-x-4 pt-4">
              {config?.facebook_link && (
                <a 
                  href={config.facebook_link} 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  style={{ color: config.secondary_color }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              )}
              {config?.twitter_link && (
                <a 
                  href={config.twitter_link} 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  style={{ color: config.secondary_color }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Contact</h4>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{config?.domain || 'demoinstitute.dev.eduley.com'}</span>
              </p>
              <p className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{config?.phone || '9818177117'}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Support</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Having issues with the system? Want to report a bug? Let us know.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-medium 
                       dark:bg-opacity-90 dark:hover:bg-opacity-100"
              style={{
                backgroundColor: config?.secondary_color || '#F7F7F7',
                color: config?.primary_color || '#6C1717',
              }}
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 dark:border-gray-800/50 mt-12 pt-8 text-sm text-gray-500 dark:text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} {config?.name || 'Eduley'}. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Powered by Eduley</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

