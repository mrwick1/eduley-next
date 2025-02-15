'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useCallback, useState } from 'react';

interface ProgramLinkProps {
  slug: string;
  children: React.ReactNode;
}

export default function ProgramLink({ slug, children }: ProgramLinkProps) {
  const router = useRouter();
  const [isPrefetched, setIsPrefetched] = useState(false);
  
  // Track if the link is in viewport
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true, // Only trigger once
  });
  console.log(inView);

  const prefetchProgram = useCallback(() => {
    if (!isPrefetched) {
      router.prefetch(`/program/${slug}`);
      setIsPrefetched(true);
    }
  }, [router, slug, isPrefetched]);

  // Prefetch when user hovers
  const handleMouseEnter = () => {
    prefetchProgram();
  };

  return (
    <Link 
      href={`/program/${slug}`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      prefetch={false} // Disable automatic prefetching
    >
      {children}
    </Link>
  );
} 