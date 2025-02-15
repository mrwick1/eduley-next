const ProgramsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse relative group 
                     shadow-[0_3px_15px_rgb(0,0,0,0.1)] dark:shadow-none border border-gray-200 dark:border-gray-700"
        >
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] 
                         bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent z-10 group-hover:pause" />
          
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-gray-200/60 dark:bg-gray-700/60" />
          
          {/* Image placeholder with gradient overlay */}
          <div className="relative">
            <div className="aspect-[3/2] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            
            {/* Status badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <div className="h-5 w-14 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full" />
              <div className="h-5 w-12 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full" />
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Course details badges */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="h-3 w-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="h-3 w-14 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>
            </div>
            
            {/* Title with animated width */}
            <div className="space-y-1.5">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[85%]" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[65%]" />
            </div>
            
            {/* Description lines */}
            <div className="space-y-1.5">
              <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
              <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[75%]" />
            </div>
            
            {/* Instructor section */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700/50 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              </div>
              <div className="h-3.5 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            
            {/* Footer section */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="space-y-1.5">
                <div className="h-3.5 w-14 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
              <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramsSkeleton; 