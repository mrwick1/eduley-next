'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import ProgramCard from '@/components/Programs/ProgramCard';
import ProgramsSkeleton from '@/components/Programs/ProgramsSkeleton';
import { usePrograms } from '@/hooks/usePrograms';
import { useDebounce } from '@/hooks/useDebounce';
import { Program } from '@/types/program';
import ProgramLink from './ProgramLink';

interface ProgramsListProps {
  initialPrograms: {
    results: Program[];
    count: number;
  };
}

function SearchHeader({ 
  searchTerm, 
  setSearchTerm, 
  totalCount 
}: { 
  searchTerm: string; 
  setSearchTerm: (value: string) => void; 
  totalCount?: number;
}) {
  return (
    <div className="w-full py-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-top md:justify-between gap-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore Programs
          </h1>
          <div className="w-full md:w-96">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                         placeholder-gray-500 dark:placeholder-gray-400
                         transition-colors duration-200"
              />
            </div>
            {totalCount !== undefined && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Found {totalCount} programs
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProgramsList = ({ initialPrograms }: ProgramsListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Add ref for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px', // Load more when within 200px of the bottom
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading
  } = usePrograms({ 
    initialData: initialPrograms,
    search: debouncedSearch 
  });

  // Load more items when scrolling near bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, pathname, router, searchParams]);

  if (isLoading) return (
    <>
      <SearchHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3"
            >
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const allPrograms = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <>
      <SearchHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        totalCount={data?.pages[0].total}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allPrograms.map((program) => (
            <ProgramLink 
              key={program.slug}
              slug={program.slug}
            >
              <ProgramCard program={program} />
            </ProgramLink>
          ))}
        </div>

        {/* Add invisible div for intersection observer */}
        <div ref={ref} className="h-1" />

        {error && (
          <div className="text-center mt-8 p-4">
            <p className="text-red-500 dark:text-red-400">Couldn&apos;t load programs. Please try again.</p>
          </div>
        )}

        {isFetchingNextPage && <ProgramsSkeleton />}

        {!hasNextPage && allPrograms.length > 0 && (
          <div className="text-center mt-12 py-8">
            <p className="text-gray-600 dark:text-gray-400">
              You've reached the end of the list
            </p>
          </div>
        )}

        {status === 'success' && allPrograms.length === 0 && (
          <div className="text-center mt-12 py-8">
            <p className="text-gray-600 dark:text-gray-400">No programs found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgramsList; 