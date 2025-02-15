'use client';

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BannerImage {
  id: number;
  index: number;
  title: string | null;
  media: {
    url: string | null;
    media_file: string | null;
  };
}

interface HeroProps {
  initialBanners: BannerImage[];
}

const Hero = ({ initialBanners }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners] = useState(initialBanners);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Debug log
  console.log('Current Banner:', banners[currentIndex]);

  const currentBanner = banners[currentIndex];
  const imageUrl = currentBanner.media.url || currentBanner.media.media_file;

  return (
    <div className="relative min-h-[500px] bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/0">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
              Transform Your Future With{" "}
              <span className="text-primary">Expert Education</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Access world-class education resources and expert mentorship to achieve
              your career goals and unlock your full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="px-6 sm:px-8 py-3 bg-primary text-white rounded-lg font-semibold 
                hover:bg-primary/90 transition-colors text-center"
              >
                Explore Programs
              </Link>
              <Link
                href="/about"
                className="px-6 sm:px-8 py-3 border-2 border-primary text-primary rounded-lg 
                font-semibold hover:bg-primary/10 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">500+</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">50+</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Expert Mentors</p>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-bold text-primary">95%</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Image Slider Section */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-full"
              >
                <Image
                  src={imageUrl || ''}
                  alt={currentBanner.title || 'Banner Image'}
                  fill
                  className="object-cover rounded-xl sm:rounded-2xl shadow-xl"
                  priority
                />
                {/* Title Overlay */}
                {currentBanner.title && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 right-4 max-w-[80%]"
                  >
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg 
                                    border-l-4 border-primary">
                      <p className="text-gray-900 dark:text-gray-100 font-medium text-sm sm:text-base line-clamp-2">
                        {currentBanner.title}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute -bottom-4 flex items-center gap-2 left-1/2 -translate-x-1/2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-primary" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 
                       hover:bg-white shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 
                       hover:bg-white shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            {/* Innovation Hub Card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Innovation Hub</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Learn by doing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

