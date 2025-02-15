'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Program } from '@/types/program';
import { Clock, BarChart2, User, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const { config } = useTheme();
  const router = useRouter();
  // Updated price formatting with Free case
  const priceDisplay = program.is_course_free
    ? "FREE"
    : `${program.currency.prefix} ${Number(program.price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;

  const handleClick = () => {
    router.push(`/program/${program.slug}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 
                dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-full"
        style={{ backgroundColor: config?.primary_color }}
      />
      
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={program.poster_images}
          alt={program.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span 
            className="backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: `${config?.primary_color}CC` }}
          >
            {program.status.toUpperCase()}
          </span>
          {program.is_course_free && (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
              FREE
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {program.duration_in_weeks}w
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <BarChart2 className="w-3.5 h-3.5 mr-1" />
            {program.course_level.charAt(0).toUpperCase() + program.course_level.slice(1)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white 
                       group-hover:text-primary dark:group-hover:text-primary transition-colors">
            {program.name}
          </h3>
          {program.short_description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {program.short_description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config?.primary_color}15` }}
          >
            <User className="w-4 h-4" style={{ color: config?.primary_color }} />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {program.instructor_detail?.iap_user?.first_name || 'Unknown'}
          </span>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Course Fee</p>
            <span 
              className={`text-lg font-bold text-gray-900 dark:text-white`}
            >
              {priceDisplay}
            </span>
          </div>
          <button 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium 
                     hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transform duration-150"
            style={{ 
              backgroundColor: config?.primary_color,
              boxShadow: `0 4px 14px ${config?.primary_color}50`
            }}
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard; 