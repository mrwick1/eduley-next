import { Suspense } from 'react';
import { Metadata } from "next";
import { getAllPrograms } from '@/lib/programs';
import ProgramsClientList from '@/components/Programs/ProgramsClientList';

export const metadata: Metadata = {
  title: 'Programs | Eduley',
  description: 'Browse all our educational programs and courses',
};

// Make this page static by setting revalidation time
export const revalidate = 3600; // Revalidate every hour

export default async function ProgramsPage() {
  // Fetch initial data on the server
  const initialData = await getAllPrograms(1);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        <ProgramsClientList initialPrograms={initialData.data} />
      </Suspense>
    </main>
  );
}
