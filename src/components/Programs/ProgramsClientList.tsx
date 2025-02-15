'use client';

import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Program } from '@/types/program';
import { getAllPrograms } from '@/lib/programs';
import ProgramsList from '@/components/Programs/ProgramsList';

interface ProgramsClientListProps {
  initialPrograms: Program[];
}

export default function ProgramsClientList({ initialPrograms }: ProgramsClientListProps) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [page, setPage] = useState(2); // Start from page 2 since we have initial data
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const loadPrograms = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const result = await getAllPrograms(page);
      setPrograms(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadPrograms();
    }
  }, [inView, loadPrograms]);

  return (
    <>
      <ProgramsList programs={programs} />
      
      {/* Loading trigger element */}
      <div ref={ref} className="h-10 mt-4">
        {isLoading && <p className="text-center">Loading more programs...</p>}
      </div>
      
      {!hasMore && programs.length > 0 && (
        <p className="text-center mt-4">No more programs to load.</p>
      )}
    </>
  );
} 