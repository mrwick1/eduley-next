import { Metadata } from "next";
import { getAllPrograms } from '@/lib/programs';
import ProgramsList from '@/components/Programs/ProgramsList';
import { Suspense } from 'react';
import { Search } from 'lucide-react';
import ProgramsSkeleton from '@/components/Programs/ProgramsSkeleton';
export const metadata: Metadata = {
  title: 'Programs | Eduley',
  description: 'Browse all our educational programs and courses',
};

// Make this page static by setting revalidation time
export const revalidate = 3600; // Revalidate every hour

function LoadingHeader() {
  return (
    <div className="w-full py-4 sm:py-6 md:py-8 mb-4 sm:mb-6 md:mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Explore Programs
          </h1>
          <div className="w-full sm:w-auto md:w-96">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <div className="block w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-lg 
                         bg-gray-100 dark:bg-gray-800">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramsLoading() {
  return (
    <>
      <LoadingHeader />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, index) => (
           <ProgramsSkeleton key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

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
