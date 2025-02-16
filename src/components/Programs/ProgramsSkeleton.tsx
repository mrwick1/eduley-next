const ProgramsSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse relative 
                     border border-gray-200 dark:border-gray-700 group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] 
                        bg-gradient-to-r from-transparent via-white/10 dark:via-gray-700/10 to-transparent" />
          
          {/* Thumbnail */}
          <div className="relative">
            <div className="aspect-video w-full bg-gradient-to-br from-gray-200 to-gray-300 
                          dark:from-gray-700 dark:to-gray-600" />
            
            {/* Category badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <div className="h-5 w-16 bg-gray-200/80 dark:bg-gray-700/80 rounded-full" />
              <div className="h-5 w-14 bg-gray-200/80 dark:bg-gray-700/80 rounded-full" />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Footer */}
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="space-y-1">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded font-semibold" />
              </div>
              <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Add shimmer animation to tailwind config if not already present
// animation: {
//   shimmer: 'shimmer 2s infinite',
// },
// keyframes: {
//   shimmer: {
//     '100%': { transform: 'translateX(100%)' },
//   },
// },

export default ProgramsSkeleton; 