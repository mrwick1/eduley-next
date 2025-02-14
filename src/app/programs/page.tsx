import { Suspense } from 'react';
import ProgramsList from '@/components/Programs/ProgramsList';
import ProgramsSkeleton from '@/components/Programs/ProgramsSkeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programs | Eduley',
  description: 'Browse all our educational programs and courses',
};

export default function ProgramsPage() {
  return (
    <div className="bg-gray-50/50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Programs</h1>
          <p className="text-gray-600">
            Discover our comprehensive range of programs designed to help you achieve your educational goals
          </p>
        </div>
        
        <Suspense fallback={<ProgramsSkeleton />}>
          <ProgramsList />
        </Suspense>
      </div>
    </div>
  );
}
