import { Metadata } from "next";
import ProgramsList from '@/components/Programs/ProgramsList';
import api from "@/api/config";
import { API_ENDPOINTS } from "@/api/end-points";

export const metadata: Metadata = {
  title: 'Programs | Eduley',
  description: 'Browse all our educational programs and courses',
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Fetch initial data at build time
async function getInitialPrograms() {
  try {
    const response = await api.get(API_ENDPOINTS.COURSE.BASE, {
      params: {
        limit: 12,
        offset: 0,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    return { results: [], count: 0 };
  }
}

export default async function Programs() {
  const initialData = await getInitialPrograms();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <ProgramsList initialData={initialData} />
    </div>
  );
}
