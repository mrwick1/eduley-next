import { Metadata } from "next";
import { getAllPrograms } from '@/lib/programs';
import ProgramsList from '@/components/Programs/ProgramsList';

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
    <ProgramsList 
      initialPrograms={{
        results: initialPrograms.data,
        count: initialPrograms.total
      }} 
    />
  );
}
