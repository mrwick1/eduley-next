'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { config } = useTheme();

  return (
    <div className="h-[calc(100vh-160px)] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-[90vw]"
      >
        {/* 404 SVG Illustration */}
        <div className="w-full max-w-[300px] mx-auto mb-6">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
          >
            <path
              fill="none"
              stroke={config?.primary_color || '#6C1717'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M30,100 Q80,50 130,100 T230,100 T330,100 T430,100"
              className="animate-pulse"
            />
            <text
              x="250"
              y="100"
              textAnchor="middle"
              className="text-8xl font-bold"
              fill={config?.primary_color || '#6C1717'}
            >
              404
            </text>
          </svg>
        </div>

        <h1 
          className="text-3xl font-bold mb-3"
          style={{ color: config?.primary_color }}
        >
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
          Oops! The page you&apos;re looking for seems to have gone on a learning adventure. 
          Let&apos;s get you back to your educational journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium 
                     transition-all duration-200 hover:-translate-y-0.5"
            style={{ 
              backgroundColor: config?.primary_color,
              boxShadow: `0 4px 14px ${config?.primary_color}50`
            }}
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium 
                     transition-all duration-200 hover:-translate-y-0.5"
            style={{ 
              color: config?.primary_color,
              backgroundColor: `${config?.primary_color}10`,
              boxShadow: `0 0 0 1px ${config?.primary_color}25`
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-gray-200 animate-ping" />
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-gray-200 animate-ping delay-300" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-gray-200 animate-ping delay-700" />
      </motion.div>
    </div>
  );
}