'use client';

import { useTheme } from "@/context/ThemeContext";

export default function Loading() {
  const { config } = useTheme();
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        {/* Main spinner */}
        <div 
          className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: `${config?.primary_color}40`, borderTopColor: config?.primary_color }}
        />
        
        {/* Inner pulse */}
        <div 
          className="absolute inset-0 rounded-full animate-pulse"
          style={{ backgroundColor: `${config?.primary_color}10` }}
        />
        
        {/* Outer rings */}
        <div 
          className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-[ping_2s_ease-out_infinite]"
          style={{ borderColor: `${config?.primary_color}20` }}
        />
        <div 
          className="absolute -inset-8 rounded-full border-2 border-primary/10 animate-[ping_2.5s_ease-out_infinite]"
          style={{ borderColor: `${config?.primary_color}10` }}
        />
        
        {/* Loading text */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium animate-pulse"
          style={{ color: config?.primary_color }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
} 