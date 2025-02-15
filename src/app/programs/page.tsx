import { Metadata } from "next";
import { getAllPrograms } from '@/lib/programs';
import ProgramsList from '@/components/Programs/ProgramsList';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Programs | Eduley',
  description: 'Browse all our educational programs and courses',
};

// Make this page static by setting revalidation time
export const revalidate = 3600; // Revalidate every hour

export default async function ProgramsPage() {
  // Fetch initial 16 items statically
  const initialPrograms = await getAllPrograms(1, undefined, 16);
  
  return (
    <Suspense fallback={<ProgramsLoading />}>
      <ProgramsList 
        initialPrograms={{
          results: initialPrograms.data,
          count: initialPrograms.total
        }} 
      />
    </Suspense>
  );
}

function ProgramsLoading() {
  return (
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
  );
}
