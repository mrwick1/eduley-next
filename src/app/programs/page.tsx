import { Metadata } from "next";
import { Suspense } from 'react';
import ProgramsList from '@/components/Programs/ProgramsList';
import { getAllPrograms } from '@/lib/programs';

export const metadata: Metadata = {
  title: 'Programs | Eduley',
  description: 'Browse all our educational programs and courses',
};

// Make this page static by setting revalidation time
export const revalidate = 3600; // Revalidate every hour

async function ProgramsPage() {
  const programs = await getAllPrograms();
  
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        <ProgramsList programs={programs} />
      </Suspense>
    </main>
  );
}

export default ProgramsPage;
