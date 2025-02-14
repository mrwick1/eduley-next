'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProgramCard from '@/components/Programs/ProgramCard';
import ProgramsSkeleton from '@/components/Programs/ProgramsSkeleton';
import { usePrograms } from '@/hooks/usePrograms';

export default function ProgramsList() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = usePrograms();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending' || status === 'error') return <ProgramsSkeleton />;

  const allPrograms = data?.pages.flatMap(page => page.results) ?? [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center mt-8 p-4">
          <p className="text-red-500">Couldn&apos;t load programs. Please try again.</p>
          <button
            onClick={refetch}
            className="mt-2 text-primary hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading more indicator */}
      {isFetchingNextPage && <ProgramsSkeleton />}

      {/* Intersection observer target */}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-20 mt-8" />
      )}

      {/* No more programs message */}
      {!hasNextPage && allPrograms.length > 0 && (
        <div className="text-center mt-12 py-8">
          <p className="text-gray-600">You've reached the end of the list</p>
        </div>
      )}

      {/* No programs found message */}
      {status === 'success' && allPrograms.length === 0 && (
        <div className="text-center mt-12 py-8">
          <p className="text-gray-600">No programs found</p>
        </div>
      )}
    </>
  );
} 